import Research from "../models/Research.js";


export async function getAllResearchs(req, res) {
    try {
        const researchs = await Research.find().lean();
        if (!researchs) {
            return res.status(404).json({ message: "Researchs were not found" });
        }
        return res.status(201).json(researchs);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}

export async function postResearch(req, res) {
    try {
        const { title, url } = req.body;

        if (!title || !url) {
            return res.status(500).json({ message: "Bad Request." });
        }

        const research = new Research({
            title,
            url
        });

        const savedResearch = research.save();

        if (savedResearch) {
            return res.status(201).json({ message: "The research has been saved correctly." });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error." });
    }
}

export async function deleteResearch(req, res) {
    try {
        const researchToDelete = await Research.findByIdAndDelete(req.params.id);
        if (!researchToDelete) {
            return res.status(500).json({ message: "The research was not found." });
        }
        return res.status(201).json({ message: "The research has been deleted" });
    } catch (err) {
        console.log(err);
    }
}