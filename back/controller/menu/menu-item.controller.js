const AbstractController = require('../AbstractController');
const MenuItemModel = require('../../model/menu/menu-item.model');
const fs = require('fs');

class MenuItemController extends AbstractController {
    constructor() {
        super(MenuItemModel);
    }

    async create(req, res) {
        try {
            const { menu_item_name, menu_item_content, id_menu, price } = req.body;
            let menu_item_image_path = null;

            if (req.file) {
                menu_item_image_path = `docker/${req.file.filename}`;
            }

            const newData = await this.model.create({ menu_item_name, menu_item_content, menu_item_image_path, id_menu, price });
            res.json(newData);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            const deletedDish = await this.model.delete(id);

            if (deletedDish.menu_item_image_path) {
                const imagePath = `G:/codes/diplom/front/public/${deletedDish.menu_item_image_path}`;
                fs.unlinkSync(imagePath);
            }

            res.json(deletedDish);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new MenuItemController();