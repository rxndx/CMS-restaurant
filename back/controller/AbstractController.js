class AbstractController {
    constructor(model) {
        this.model = model;
    }

    async create(req, res) {
        try {
            const newData = await this.model.create(req.body);
            res.json(newData);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const data = await this.model.getAll();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getOne(req, res) {
        try {
            const id = req.params.id;
            const data = await this.model.getOne(id);
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const updatedData = await this.model.update(req.body);
            res.json(updatedData);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            const deletedData = await this.model.delete(id);
            res.json(deletedData);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = AbstractController;