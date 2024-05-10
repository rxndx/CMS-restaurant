const AbstractController = require('../AbstractController');
const MenuModel = require('../../model/menu/menu.model');
const fs = require('fs');

class MenuController extends AbstractController {
    constructor() {
        super(MenuModel);
    }

    async create(req, res) {
        try {
            const { menu_name, menu_content } = req.body;
            let menu_image_path = null;

            if (req.file) {
                menu_image_path = `docker/${req.file.filename}`;
            }

            const newData = await this.model.create({ menu_name, menu_content, menu_image_path });
            res.json(newData);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            const deletedMenu = await this.model.delete(id);

            if (deletedMenu.menu_image_path) {
                const imagePath = `G:/codes/diplom/front/public/${deletedMenu.menu_image_path}`;
                fs.unlinkSync(imagePath);
            }

            res.json(deletedMenu);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new MenuController();