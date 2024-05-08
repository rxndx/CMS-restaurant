const db = require('../../db');

class CatalogMenuModel {
    async create(catalogMenuData) {
        try {
            const { id_menu, id_catalog } = catalogMenuData;
            const newCatalogMenu = await db.query(`
                INSERT INTO "CATALOG_MENU" (id_menu, id_catalog)
                VALUES ($1, $2) RETURNING *
            `, [id_menu, id_catalog]);
            return newCatalogMenu.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const menu = await db.query(      `SELECT
          cm.catalog_menu_id,
          c.catalog_id,
          c.catalogs_name,
          c.catalog_content,
          json_agg(json_build_object(
              'menu_id', m.menu_id,
              'menu_name', m.menu_name,
              'menu_content', m.menu_content
          )) AS menu_list
      FROM
          "CATALOG_MENU" cm
      JOIN
          "CATALOG" c ON cm.id_catalog = c.catalog_id
      JOIN
          "MENU" m ON cm.id_menu = m.menu_id
      GROUP BY
          cm.catalog_menu_id,
          c.catalog_id,
          c.catalogs_name,
          c.catalog_content;`);
            return menu.rows;
        } catch (error) {
            throw error;
        }
    }

    async getOne(id) {
        try {
            const oneMenu = await db.query(      `SELECT
                                                      cm.catalog_menu_id,
                                                      c.catalog_id,
                                                      c.catalogs_name,
                                                      c.catalog_content,
                                                      json_build_object(
                                                              'menu_id', m.menu_id,
                                                              'menu_name', m.menu_name,
                                                              'menu_content', m.menu_content
                                                      ) AS menu_list
                                                  FROM
                                                      "CATALOG_MENU" cm
                                                          JOIN
                                                      "CATALOG" c ON cm.id_catalog = c.catalog_id
                                                          JOIN
                                                      "MENU" m ON cm.id_menu = m.menu_id
                                                  WHERE
                                                      cm.catalog_menu_id = $1;`,
                [id]
            );
            return oneMenu.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async update(catalogMenuData) {
        try {
            const { catalog_menu_id, id_menu, id_catalog } = catalogMenuData;
            const updatedCatalogMenu = await db.query(`
                UPDATE "CATALOG_MENU" SET id_menu = $1, id_catalog = $2
                WHERE catalog_menu_id = $3 RETURNING *
            `, [id_menu, id_catalog, catalog_menu_id]);
            return updatedCatalogMenu.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const deletedCatalogMenu = await db.query('DELETE FROM "CATALOG_MENU" WHERE catalog_menu_id = $1 RETURNING *', [id]);
            return deletedCatalogMenu.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new CatalogMenuModel();