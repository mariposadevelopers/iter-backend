import Channel from "../models/Channel.js";

export async function getAllChannels(req, res) {
    try {
        const channels = await Channel.find().lean();
        if (!channels) {
            return res.status(404).json({ message: "Channels were not found" });
        }
        return res.status(201).json(channels);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}

export async function postChannel(req, res) {
    try {
        const { name, description, url } = req.body;

        if (!name || !description || !url) {
            return res.status(500).json({ message: "Bad Request." });
        }

        const channel = new Channel({
            name,
            description,
            url
        });

        const savedChannel = channel.save();

        if (savedChannel) {
            return res.status(201).json({ message: "The channel has been saved correctly." });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error." });
    }
}

export async function deleteChannel(req, res) {
    try {
        const channelToDelete = await Channel.findByIdAndDelete(req.params.id);
        if (!channelToDelete) {
            return res.status(500).json({ message: "The channel was not found." });
        }
        return res.status(201).json({ message: "The channel has been deleted" });
    } catch (err) {
        console.log(err);
    }
}