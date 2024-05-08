CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION hash_password(password_text TEXT)
RETURNS TEXT AS $$
BEGIN
RETURN ENCODE(DIGEST(password_text::BYTEA, 'sha256'), 'hex');
END;
$$ LANGUAGE plpgsql;

-- Role: admin

CREATE ROLE admin WITH
    LOGIN
    SUPERUSER
    INHERIT
    CREATEDB
    CREATEROLE
    NOREPLICATION
    ENCRYPTED PASSWORD 'SCRAM-SHA-256$4096:b+Zs2etr5HvFQNVldvr9Mg==$X+7Z6cnPcwJohgG4XEXvu0sWEApI7dy7O8azABhmwh8=:8jIEPhK87DWAynFW8i5h0NGcIaTmYgppuQm4h/1BKDQ=';

-- Role: client

CREATE ROLE client WITH
    LOGIN
    NOSUPERUSER
    NOINHERIT
    NOCREATEDB
    NOCREATEROLE
    NOREPLICATION;

-- Role: kitchen

CREATE ROLE kitchen WITH
    LOGIN
    NOSUPERUSER
    NOINHERIT
    NOCREATEDB
    NOCREATEROLE
    NOREPLICATION
    ENCRYPTED PASSWORD 'SCRAM-SHA-256$4096:vOfUGWabTZop6L9OtkVlNA==$DxEcxPJ57CBA0VdWJ/q2/EvGtmGDq5oH2eUpA2V4x8c=:uEzhF5Mq8e+aJ/dwbdNcfb9Ku7kwSvEumWLpFKeHd90=';

-- Role: manager

CREATE ROLE manager WITH
    LOGIN
    NOSUPERUSER
    NOINHERIT
    CREATEDB
    CREATEROLE
    NOREPLICATION
    ENCRYPTED PASSWORD 'SCRAM-SHA-256$4096:80vfpBVmK4nw9/VjVxzIAQ==$dW9I0AV+4ffVwgm7v4sM6xaKfc1ty7XgIkdHisMw8EY=:9BPCXJYdubMHITbhiW9UWU3ku3KT8qJOulpJDKBJ9IE=';

-- Role: operator

CREATE ROLE operator WITH
    LOGIN
    NOSUPERUSER
    NOINHERIT
    NOCREATEDB
    CREATEROLE
    NOREPLICATION
    ENCRYPTED PASSWORD 'SCRAM-SHA-256$4096:BXY6A8ZFguuja9Qx4VM1aQ==$0RsyUK3McZhuQR4TjolZMnigo7odMfGNvIAJTBcqtog=:/l2ZcGf61LrZLDiquGMXL45Pu+Un0FfBmm0uXJMNtzY=';

-- Sequences for all tables

CREATE SEQUENCE "DESIGN_design_id_seq" START 1;
CREATE SEQUENCE "BRAND_brand_id_seq" START 1;
CREATE SEQUENCE "ACCOUNT_account_id_seq" START 1;
CREATE SEQUENCE "COUNTRY_country_id_seq" START 1;
CREATE SEQUENCE "CATALOG_catalog_id_seq" START 1;
CREATE SEQUENCE "CUSTOMER_PROFILE_customer_id_seq" START 1;
CREATE SEQUENCE "TAGS_tag_id_seq" START 1;
CREATE SEQUENCE "MENU_menu_id_seq" START 1;
CREATE SEQUENCE "MENU_ITEM_menu_item_id_seq" START 1;
CREATE SEQUENCE "BONUS_bonus_id_seq" START 1;
CREATE SEQUENCE "FOOD_TAGS_food_tags_id_seq" START 1;
CREATE SEQUENCE "MENU_TAGS_menu_tags_id_seq" START 1;
CREATE SEQUENCE "DISCOUNT_discount_id_seq" START 1;
CREATE SEQUENCE "CATEGORY_category_id_seq" START 1;
CREATE SEQUENCE "STOCK_stock_id_seq" START 1;
CREATE SEQUENCE "PRODUCT_product_id_seq" START 1;
CREATE SEQUENCE "ORDER_order_id_seq" START 1;
CREATE SEQUENCE "ORDER_ITEM_order_item_id_seq" START 1;
CREATE SEQUENCE "REVIEW_review_id_seq" START 1;
CREATE SEQUENCE "CATALOG_MENU_catalog_id_seq" START 1;

-- 1# Table: public.DESIGN

CREATE TABLE IF NOT EXISTS public."DESIGN"
(
    design_id integer NOT NULL DEFAULT nextval('"DESIGN_design_id_seq"'::regclass),
    design_type character varying COLLATE pg_catalog."default" NOT NULL,
    file_path character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "DESIGN_pkey" PRIMARY KEY (design_id)
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."DESIGN"
    OWNER to postgres;

-- 2# Table: public.BRAND

CREATE TABLE IF NOT EXISTS public."BRAND"
(
    brand_id integer NOT NULL DEFAULT nextval('"BRAND_brand_id_seq"'::regclass),
    brand_name character varying COLLATE pg_catalog."default" NOT NULL,
    id_design integer NOT NULL,
    CONSTRAINT "BRAND_pkey" PRIMARY KEY (brand_id),
    CONSTRAINT "BRAND_id_design_fkey" FOREIGN KEY (id_design)
    REFERENCES public."DESIGN" (design_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."BRAND"
    OWNER to postgres;

-- 3# Table: public.ACCOUNT

CREATE TABLE IF NOT EXISTS public."ACCOUNT"
(
    account_id integer NOT NULL DEFAULT nextval('"ACCOUNT_account_id_seq"'::regclass),
    id_brand integer NOT NULL,
    email character varying COLLATE pg_catalog."default" NOT NULL,
    surname character varying COLLATE pg_catalog."default" NOT NULL,
    account_name character varying COLLATE pg_catalog."default" NOT NULL,
    password_hash character varying COLLATE pg_catalog."default" NOT NULL,
    phone character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "ACCOUNT_pkey" PRIMARY KEY (account_id),
    CONSTRAINT "ACCOUNT_id_brand_fkey" FOREIGN KEY (id_brand)
    REFERENCES public."BRAND" (brand_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."ACCOUNT"
    OWNER to postgres;

-- 4# Table: public.COUNTRY

CREATE TABLE IF NOT EXISTS public."COUNTRY"
(
    country_id integer NOT NULL DEFAULT nextval('"COUNTRY_country_id_seq"'::regclass),
    country_name character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "COUNTRY_pkey" PRIMARY KEY (country_id)
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."COUNTRY"
    OWNER to postgres;

-- 5# Table: public.CATALOG

CREATE TABLE IF NOT EXISTS public."CATALOG"
(
    catalog_id integer NOT NULL DEFAULT nextval('"CATALOG_catalog_id_seq"'::regclass),
    catalogs_name character varying COLLATE pg_catalog."default" NOT NULL,
    catalog_content character varying COLLATE pg_catalog."default" NOT NULL,
    id_country integer NOT NULL,
    id_brand integer NOT NULL,
    CONSTRAINT "CATALOG_pkey" PRIMARY KEY (catalog_id),
    CONSTRAINT "CATALOG_id_brand_fkey" FOREIGN KEY (id_brand)
    REFERENCES public."BRAND" (brand_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID,
    CONSTRAINT catalog_to_country FOREIGN KEY (id_country)
    REFERENCES public."COUNTRY" (country_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."CATALOG"
    OWNER to postgres;

-- 6# Table: public.CUSTOMER_PROFILE

CREATE TABLE IF NOT EXISTS public."CUSTOMER_PROFILE"
(
    customer_id integer NOT NULL DEFAULT nextval('"CUSTOMER_PROFILE_customer_id_seq"'::regclass),
    address character varying COLLATE pg_catalog."default" NOT NULL,
    birthday date NOT NULL,
    company character varying COLLATE pg_catalog."default",
    "position" character varying COLLATE pg_catalog."default",
    allergy character varying COLLATE pg_catalog."default",
    dietary_restriction character varying COLLATE pg_catalog."default",
    loyalty_points integer NOT NULL,
    id_account integer NOT NULL,
    CONSTRAINT "CUSTOMER_PROFILE_pkey" PRIMARY KEY (customer_id),
    CONSTRAINT "CUSTOMER_PROFILE_id_account_fkey" FOREIGN KEY (id_account)
    REFERENCES public."ACCOUNT" (account_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."CUSTOMER_PROFILE"
    OWNER to postgres;

-- 7# Table: public.TAGS

CREATE TABLE IF NOT EXISTS public."TAGS"
(
    tag_id integer NOT NULL DEFAULT nextval('"TAGS_tag_id_seq"'::regclass),
    tag_name character varying COLLATE pg_catalog."default" NOT NULL,
    tag_content character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "TAGS_pkey" PRIMARY KEY (tag_id)
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."TAGS"
    OWNER to postgres;

-- 8# Table: public.MENU

CREATE TABLE IF NOT EXISTS public."MENU"
(
    menu_id integer NOT NULL DEFAULT nextval('"MENU_menu_id_seq"'::regclass),
    menu_name character varying COLLATE pg_catalog."default" NOT NULL,
    menu_content character varying COLLATE pg_catalog."default" NOT NULL,
    menu_image_path character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "MENU_pkey" PRIMARY KEY (menu_id)
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."MENU"
    OWNER to postgres;

-- 9# Table: public.MENU_ITEM

CREATE TABLE IF NOT EXISTS public."MENU_ITEM"
(
    menu_item_id integer NOT NULL DEFAULT nextval('"MENU_ITEM_menu_item_id_seq"'::regclass),
    menu_item_name character varying COLLATE pg_catalog."default" NOT NULL,
    menu_item_content character varying COLLATE pg_catalog."default" NOT NULL,
    menu_item_image_path character varying COLLATE pg_catalog."default" NOT NULL,
    id_menu integer NOT NULL,
    price money NOT NULL,
    CONSTRAINT "MENU_ITEM_pkey" PRIMARY KEY (menu_item_id),
    CONSTRAINT "MENU_ITEM_id_menu_fkey" FOREIGN KEY (id_menu)
    REFERENCES public."MENU" (menu_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."MENU_ITEM"
    OWNER to postgres;

-- 10# Table: public.BONUS

CREATE TABLE IF NOT EXISTS public."BONUS"
(
    bonus_id integer NOT NULL DEFAULT nextval('"BONUS_bonus_id_seq"'::regclass),
    bonus_name character varying COLLATE pg_catalog."default" NOT NULL,
    bonus_content character varying COLLATE pg_catalog."default" NOT NULL,
    bonus_score integer NOT NULL,
    id_item_menu integer NOT NULL,
    CONSTRAINT "BONUS_pkey" PRIMARY KEY (bonus_id),
    CONSTRAINT "BONUS_id_item_menu_fkey" FOREIGN KEY (id_item_menu)
    REFERENCES public."MENU_ITEM" (menu_item_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."BONUS"
    OWNER to postgres;

-- 11# Table: public.FOOD_TAGS

CREATE TABLE IF NOT EXISTS public."FOOD_TAGS"
(
    food_tags_id integer NOT NULL DEFAULT nextval('"FOOD_TAGS_food_tags_id_seq"'::regclass),
    id_item_menu integer NOT NULL,
    id_tags integer NOT NULL,
    CONSTRAINT "FOOD_TAGS_pkey" PRIMARY KEY (food_tags_id),
    CONSTRAINT "FOOD_TAGS_id_item_menu_fkey" FOREIGN KEY (id_item_menu)
    REFERENCES public."MENU_ITEM" (menu_item_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,
    CONSTRAINT "FOOD_TAGS_id_tags_fkey" FOREIGN KEY (id_tags)
    REFERENCES public."TAGS" (tag_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."FOOD_TAGS"
    OWNER to postgres;

-- 12# Table: public.MENU_TAGS

CREATE TABLE IF NOT EXISTS public."MENU_TAGS"
(
    menu_tags_id integer NOT NULL DEFAULT nextval('"MENU_TAGS_menu_tags_id_seq"'::regclass),
    id_menu integer NOT NULL,
    id_tags integer NOT NULL,
    CONSTRAINT "MENU_TAGS_pkey" PRIMARY KEY (menu_tags_id),
    CONSTRAINT menutags_to_menu FOREIGN KEY (id_menu)
    REFERENCES public."MENU" (menu_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID,
    CONSTRAINT menutags_to_tags FOREIGN KEY (id_tags)
    REFERENCES public."TAGS" (tag_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."MENU_TAGS"
    OWNER to postgres;

-- 13# Table: public.DISCOUNT

CREATE TABLE IF NOT EXISTS public."DISCOUNT"
(
    discount_id integer NOT NULL DEFAULT nextval('"DISCOUNT_discount_id_seq"'::regclass),
    discount_name character varying COLLATE pg_catalog."default" NOT NULL,
    discount_percent integer NOT NULL,
    id_menu integer NOT NULL,
    CONSTRAINT "DISCOUNT_pkey" PRIMARY KEY (discount_id),
    CONSTRAINT "DISCOUNT_id_menu_fkey" FOREIGN KEY (id_menu)
    REFERENCES public."MENU" (menu_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."DISCOUNT"
    OWNER to postgres;

-- 14# Table: public.CATEGORY

CREATE TABLE IF NOT EXISTS public."CATEGORY"
(
    category_id integer NOT NULL DEFAULT nextval('"CATEGORY_category_id_seq"'::regclass),
    category_name character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "CATEGORY_pkey" PRIMARY KEY (category_id)
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."CATEGORY"
    OWNER to postgres;

-- 15# Table: public.STOCK

CREATE TABLE IF NOT EXISTS public."STOCK"
(
    stock_id integer NOT NULL DEFAULT nextval('"STOCK_stock_id_seq"'::regclass),
    product_name character varying COLLATE pg_catalog."default" NOT NULL,
    product_quantity character varying COLLATE pg_catalog."default" NOT NULL,
    id_category integer NOT NULL,
    CONSTRAINT "STOCK_pkey" PRIMARY KEY (stock_id),
    CONSTRAINT stock_to_category FOREIGN KEY (id_category)
    REFERENCES public."CATEGORY" (category_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."STOCK"
    OWNER to postgres;

-- 16# Table: public.PRODUCT

CREATE TABLE IF NOT EXISTS public."PRODUCT"
(
    product_id integer NOT NULL DEFAULT nextval('"PRODUCT_product_id_seq"'::regclass),
    id_stock integer NOT NULL,
    id_item_menu integer NOT NULL,
    CONSTRAINT "PRODUCT_pkey" PRIMARY KEY (product_id),
    CONSTRAINT "PRODUCT_id_item_menu_fkey" FOREIGN KEY (id_item_menu)
    REFERENCES public."MENU_ITEM" (menu_item_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,
    CONSTRAINT "PRODUCT_id_stock_fkey" FOREIGN KEY (id_stock)
    REFERENCES public."STOCK" (stock_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."PRODUCT"
    OWNER to postgres;

-- 17# Table: public.ORDER

CREATE TABLE IF NOT EXISTS public."ORDER"
(
    order_id integer NOT NULL DEFAULT nextval('"ORDER_order_id_seq"'::regclass),
    id_client integer NOT NULL,
    status character varying COLLATE pg_catalog."default" NOT NULL,
    price money NOT NULL,
    receipt_date timestamp with time zone,
    completed_date timestamp with time zone,
                                 CONSTRAINT "ORDER_pkey" PRIMARY KEY (order_id),
    CONSTRAINT "ORDER_id_client_fkey" FOREIGN KEY (id_client)
    REFERENCES public."CUSTOMER_PROFILE" (customer_id) MATCH SIMPLE
                             ON UPDATE NO ACTION
                             ON DELETE NO ACTION
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."ORDER"
    OWNER to postgres;

-- 18# Table: public.ORDER_ITEM

CREATE TABLE IF NOT EXISTS public."ORDER_ITEM"
(
    order_item_id integer NOT NULL DEFAULT nextval('"ORDER_ITEM_order_item_id_seq"'::regclass),
    id_order integer NOT NULL,
    id_menu_item integer NOT NULL,
    quantity integer NOT NULL,
    CONSTRAINT "ORDER_ITEM_pkey" PRIMARY KEY (order_item_id),
    CONSTRAINT "ORDER_ITEM_id_menu_item_fkey" FOREIGN KEY (id_menu_item)
    REFERENCES public."MENU_ITEM" (menu_item_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,
    CONSTRAINT "ORDER_ITEM_id_order_fkey" FOREIGN KEY (id_order)
    REFERENCES public."ORDER" (order_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."ORDER_ITEM"
    OWNER to postgres;

-- 19# Table: public.REVIEW

CREATE TABLE IF NOT EXISTS public."REVIEW"
(
    review_id integer NOT NULL DEFAULT nextval('"REVIEW_review_id_seq"'::regclass),
    id_customer integer NOT NULL,
    comment character varying COLLATE pg_catalog."default" NOT NULL,
    id_menu_item integer NOT NULL,
    rating integer NOT NULL,
    CONSTRAINT "REVIEW_pkey" PRIMARY KEY (review_id),
    CONSTRAINT "REVIEW_id_customer_fkey" FOREIGN KEY (id_customer)
    REFERENCES public."CUSTOMER_PROFILE" (customer_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,
    CONSTRAINT "REVIEW_id_menu_item_fkey" FOREIGN KEY (id_menu_item)
    REFERENCES public."MENU_ITEM" (menu_item_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."REVIEW"
    OWNER to postgres;

-- 20# Table: public.CATALOG_MENU

CREATE TABLE IF NOT EXISTS public."CATALOG_MENU"
(
    catalog_menu_id integer NOT NULL DEFAULT nextval('"CATALOG_MENU_catalog_id_seq"'::regclass),
    id_menu integer NOT NULL,
    id_catalog integer NOT NULL,
    CONSTRAINT "CATALOG_MENU_pkey" PRIMARY KEY (catalog_menu_id),
    CONSTRAINT "CATALOG_MENU_id_catalog_fkey" FOREIGN KEY (id_catalog)
    REFERENCES public."CATALOG" (catalog_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,
    CONSTRAINT "CATALOG_MENU_id_menu_fkey" FOREIGN KEY (id_menu)
    REFERENCES public."MENU" (menu_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."CATALOG_MENU"
    OWNER to postgres;

-- 1# Table: public.DESIGN

INSERT INTO public."DESIGN" (design_type, file_path)
VALUES
    ('1', 'Путь_к_тестовому_дизайну_1'),
    ('2', 'Путь_к_тестовому_дизайну_2');

-- 2# Table: public.BRAND

INSERT INTO public."BRAND" (brand_name, id_design)
VALUES
    ('GourmetHarmony','2'),
    ('TasteBoulevard', '1');

-- 3# Table: public.ACCOUNT

INSERT INTO public."ACCOUNT" (id_brand, email, surname, account_name, password_hash, phone)
VALUES
    (1, 'olena.ivanenko@example.com', 'Ivanenko', 'Olena', hash_password('111'), '380501234567'),
    (1, 'mykola.kovalenko@example.com', 'Kovalenko', 'Mykola', hash_password('222'), '380677890123'),
    (1, 'andriy.petrenko@example.com', 'Petrenko', 'Andriy', hash_password('333'), '380931234567'),
    (1, 'mariya.yaroslavova@example.com', 'Yaroslavova', 'Mariya', hash_password('444'), '380506543210'),
    (1, 'viktor.melnyk@example.com', 'Melnyk', 'Viktor', hash_password('555'), '380688765432'),
    (1, 'alexei.romanov@example.com', 'Romanov', 'Alexei', hash_password('666'), '380991112233'),
    (2, 'ekaterina.petrova@example.com', 'Petrova', 'Ekaterina', hash_password('777'), '380971234567');

-- 4# Table: public.COUNTRY

INSERT INTO public."COUNTRY" (country_name)
VALUES
    ('India'),
    ('Italy'),
    ('United States'),
    ('Japan'),
    ('Mixed');

-- 5# Table: public.CATALOG

INSERT INTO public."CATALOG" (catalogs_name, catalog_content, id_country, id_brand)
VALUES
    ('Spice of India', 'Embark on a culinary journey through the vibrant and aromatic world of Indian cuisine with our Spice of India catalog. Experience the rich tapestry of flavors, from savory curries to tantalizing tandoori dishes. Let the spices of India ignite your taste buds.', 1, 1),
    ('Pasta Paradise', 'Transport yourself to the heart of Italy with our Pasta Paradise catalog. From classic spaghetti Bolognese to innovative pasta creations, this catalog is a celebration of Italys love affair with pasta. Indulge in the comforting and diverse world of Italian pasta dishes.', 2, 1),
    ('Grill Masters Delight', 'Fire up the barbecue and explore the smoky and savory delights of our Grill Masters Delight catalog. From perfectly grilled steaks to mouthwatering burgers, this catalog is a haven for barbecue enthusiasts. Unleash your inner grill master and savor the bold flavors of the grill.', 3, 1),
    ('Tokyo Sushi Symphony', 'Immerse yourself in the artistry of Japanese cuisine with our Tokyo Sushi Symphony catalog. From delicate sashimi to expertly crafted sushi rolls, this catalog offers a symphony of flavors and textures inspired by the culinary traditions of Tokyo. Experience the precision and elegance of Japanese sushi.', 4, 1),
    ('Zen Tea Elegance', 'Embark on a serene journey into the world of Japanese tea culture with our Zen Tea Elegance catalog. Delight in the subtle beauty and delicate flavors of traditional Japanese teas, including matcha, sencha, and genmaicha. Immerse yourself in the tranquility of a Japanese tea ceremony and experience the art of tea appreciation.', 4, 1),
    ('Global Indulgence Sampler', 'Treat yourself to a diverse array of international delicacies with our Global Indulgence Sampler menu. Explore the rich flavors of various cuisines, from the comforting warmth of Indian Chai to the exotic sweetness of Gulab Jamun. Indulge in a culinary journey around the world, sampling a selection of delectable dishes and beverages.', 5, 1);

-- 6# Table: public.CUSTOMER_PROFILE

INSERT INTO public."CUSTOMER_PROFILE" (address, birthday, company, "position", allergy, dietary_restriction, loyalty_points, id_account)
VALUES
    ('15 Seaside Street, Odessa, Ukraine', '1985-07-20', 'Odessa Seafood Importers', 'Marketing Manager', 'Shellfish', 'Dairy', 350, 1),
    ('27 Harbour View Avenue, Odessa, Ukraine', '1990-03-12', 'Odessa Engineering Solutions', 'Project Engineer', 'Peanuts', 'Gluten-Free', 420, 2),
    ('5 Sunset Boulevard, Odessa, Ukraine', '1982-11-28', 'Odessa Tours and Travels', 'Tour Guide', 'None', 'Vegetarian', 250, 3),
    ('10 Marina Street, Odessa, Ukraine', '1978-09-03', 'Odessa Health', 'Clinic Physician', 'Soy', 'None', 550, 4),
    ('20 Palm Grove Lane, Odessa, Ukraine', '1989-05-17', 'Odessa Legal Services', 'Lawyer', 'None', 'None', 300, 5);

-- 7# Table: public.TAGS

INSERT INTO public."TAGS" (tag_name, tag_content)
VALUES
    ('#NonVegetarian', 'Indicates dishes that contain meat or animal products.'),
    ('#SpicyDish', 'Highlights dishes with a spicy flavor profile.'),
    ('#IndianCuisine', 'Signifies dishes inspired by Indian culinary traditions.'),
    ('#ItalianPasta', 'Refers to pasta dishes with an Italian touch.'),
    ('#JapaneseSushi', 'Identifies dishes related to Japanese sushi and sashimi.'),
    ('#Seafood', 'Marks dishes featuring various seafood options.'),
    ('#BBQ', 'Denotes dishes prepared through barbecue cooking methods.'),
    ('#GrilledMeat', 'Points to dishes that involve grilled meat.'),
    ('#BaconLover', 'For those who enjoy dishes with bacon as a prominent ingredient.'),
    ('#SashimiLover', 'Appeals to individuals fond of raw fish slices (sashimi).'),
    ('#SushiRolls', 'Highlights dishes consisting of rolled sushi.'),
    ('#Tempura', 'Indicates dishes that include tempura-fried items.'),
    ('#BurgerDelight', 'Celebrates the joy of indulging in delicious burgers.'),
    ('#ChickenSkewers', 'Features dishes revolving around skewered chicken.'),
    ('#TeaLover', 'Caters to enthusiasts of various tea beverages.'),
    ('#JapaneseTea', 'Specific to teas originating from Japan.'),
    ('#GreenTea', 'Emphasizes dishes and drinks with green tea flavors.'),
    ('#Matcha', 'Relates to dishes incorporating matcha, a powdered green tea.'),
    ('#MisoSoup', 'Signifies the presence of miso soup in a dish.'),
    ('#DessertLover', 'Appeals to those with a sweet tooth for desserts.'),
    ('#ChaiTime', 'Refers to dishes or beverages associated with chai (Indian spiced tea).'),
    ('#BreadLover', 'For individuals who appreciate dishes featuring bread.'),
    ('#FriedFood', 'Marks dishes that involve frying techniques.'),
    ('#WinePairing', 'Suggests dishes that pair well with Italian wines.'),
    ('#SweetTooth', 'Attracts those who enjoy sweet and sugary treats.'),
    ('#MochiLover', 'Caters to individuals fond of dishes with mochi.'),
    ('#GlutenFreeOptions', 'Indicates the availability of gluten-free options.'),
    ('#LactoseFreeOptions', 'Highlights dishes suitable for lactose-intolerant individuals.'),
    ('#NutFree', 'Assures the absence of nuts in the dish.'),
    ('#ShellfishFree', 'Ensures that the dish is free from shellfish ingredients.'),
    ('#SoyFree', 'Guarantees that the dish does not contain soy products.'),
    ('#Vegetarian', 'This tag is applied to dishes that are entirely plant-based, avoiding any form of meat or animal products. Vegetarian dishes often showcase a variety of fruits, vegetables, grains, legumes, and other plant-based ingredients, providing a flavorful and satisfying alternative for individuals who follow a vegetarian diet. These dishes are suitable for those seeking a meat-free dining experience, whether for personal preferences, ethical reasons, or health considerations. The tag assures that the dish does not contain any meat, poultry, fish, or other animal by-products, making it an excellent choice for those embracing a vegetarian lifestyle.');

-- 8# Table: public.MENU

INSERT INTO public."MENU" (menu_name, menu_content, menu_image_path)
VALUES
    ('International Culinary Adventure', 'Embark on a global culinary journey with our International Culinary Adventure menu, featuring a diverse selection of dishes from different corners of the world. Indulge in the rich flavors of Indian curries, Italian pastas, American barbecue, and Japanese sushi. Immerse yourself in the vibrant tapestry of international cuisines, carefully curated to satisfy your adventurous palate.', 'docker/International Culinary Adventure.png'),
    ('Meat Lovers Feast', 'Satisfy your carnivorous cravings with our Meat Lovers Feast menu, a tantalizing selection of meat-centric dishes that are sure to delight. From succulent lamb kebabs to spicy tuna rolls, this menu is a carnivore''s dream come true.', 'docker/Meat Lovers Feast.png'),
    ('Vegetarian Delights', 'Immerse yourself in the world of vegetarian indulgence with our Vegetarian Delights menu. From flavorful Indian curries to innovative Italian pasta creations, savor the exquisite taste of dishes that celebrate the bounty of nature without compromising on taste and satisfaction.', 'docker/Vegetarian Delights.png'),
    ('Pescatarian Paradise', 'Dive into the bountiful flavors of the sea with our Pescatarian Paradise menu. From sushi rolls to linguine with seafood, this menu is a celebration of ocean-inspired delights for those who prefer a pescatarian lifestyle.', 'docker/Pescatarian Paradise.png'),
    ('Grill Masters Ultimate Feast', 'Unleash your inner grill master and experience the smoky and savory delights of our Grill Master''s Ultimate Feast menu. From perfectly grilled steaks to mouthwatering barbecue ribs, each dish is a testament to the bold and robust flavors that define American barbecue cuisine.', 'docker/Grill Masters Ultimate Feast.png'),
    ('Japanese Tea Ceremony Experience', 'Immerse yourself in the tranquility and elegance of Japanese tea culture with our Japanese Tea Ceremony Experience menu. Indulge in traditional Japanese teas and delicate sweets, creating a harmonious balance of flavors that transport you to the serene landscapes of Japan.', 'docker/Japanese Tea Ceremony Experience.png'),
    ('Global Indulgence Sampler', 'Immerse yourself in a tantalizing journey of diverse flavors from around the world with our Global Indulgence Sampler menu. Each dish is a masterpiece crafted to perfection, offering an exquisite blend of ingredients and culinary traditions that will transport your taste buds to different corners of the globe.', 'docker/Global Indulgence Sampler.png');

-- 9# Table: public.MENU_ITEM

INSERT INTO public."MENU_ITEM" (menu_item_name, menu_item_content, menu_item_image_path, id_menu, price)
VALUES
    ('Masala Chicken Curry', 'Aromatic chicken curry cooked with a blend of Indian spices and herbs.', 'docker/Masala Chicken Curry.png', 1, 120),
    ('Tandoori Lamb Kebabs', 'Succulent lamb marinated in yogurt and spices, grilled to perfection.', 'docker/Tandoori Lamb Kebabs.png', 2, 150),
    ('Vegetable Biryani', 'Fragrant basmati rice cooked with mixed vegetables and aromatic spices.', 'docker/Vegetable Biryani.png', 3, 100),
    ('Paneer Tikka Masala', 'Grilled paneer cubes in a creamy and flavorful tomato-based curry.', 'docker/Paneer Tikka Masala.png', 3, 130),
    ('Spaghetti Carbonara', 'Classic Roman dish with spaghetti, pancetta, eggs, and Parmesan cheese.', 'docker/Spaghetti Carbonara.png', 1, 110),
    ('Truffle Mushroom Risotto', 'Creamy Arborio rice cooked with truffle-infused mushrooms.', 'docker/Truffle Mushroom Risotto.png', 3, 140),
    ('Seafood Linguine Fra Diavolo', 'Linguine pasta with spicy tomato sauce, shrimp, and calamari.', 'docker/Seafood Linguine Fra Diavolo.png', 4, 160),
    ('Pesto Zucchini Noodles', 'Zucchini noodles tossed in a vibrant pesto sauce with cherry tomatoes.', 'docker/Pesto Zucchini Noodles.png', 3, 120),
    ('Classic BBQ Ribs', 'Slow-cooked ribs glazed with tangy barbecue sauce.', 'docker/Classic BBQ Ribs.png', 5, 180),
    ('Grilled Chimichurri Skirt Steak', 'Tender skirt steak marinated in chimichurri sauce, grilled to perfection.', 'docker/Grilled Chimichurri Skirt Steak.png', 5, 150),
    ('Smoky Maple Bacon Burger', 'Juicy beef patty topped with smoky maple-glazed bacon.', 'docker/Smoky Maple Bacon Burger.png', 5, 130),
    ('BBQ Chicken Skewers', 'Skewers of marinated chicken grilled to perfection with barbecue sauce.', 'docker/BBQ Chicken Skewers.png', 5, 120),
    ('Sashimi Sampler', 'Assortment of fresh tuna, salmon, and yellowtail sashimi.', 'docker/Sashimi Sampler.png', 1, 160),
    ('Dragon Roll', 'Eel, avocado, and cucumber rolled in rice, topped with eel sauce and tobiko.', 'docker/Dragon Roll.png', 3, 180),
    ('Spicy Tuna Roll', 'Tuna, spicy mayo, and cucumber rolled in seaweed and rice.', 'docker/Spicy Tuna Roll.png', 4, 130),
    ('Tempura Shrimp Uramaki', 'Shrimp tempura, avocado, and cucumber rolled in rice, topped with spicy mayo.', 'docker/Tempura Shrimp Uramaki.png', 4, 140),
    ('Matcha Latte', 'Traditional Japanese matcha green tea blended with steamed milk.', 'docker/Matcha Latte.png', 6, 90),
    ('Sakura Sencha', 'Fragrant sencha green tea with cherry blossom petals.', 'docker/Sakura Sencha.png', 6, 80),
    ('Genmaicha Rice Tea', 'Roasted brown rice and green tea blend for a toasty and nutty flavor.', 'docker/Genmaicha Rice Tea.png', 6, 100),
    ('Traditional Japanese Matcha Ceremony Set', 'Matcha tea, sweets, and all the tools needed for a traditional tea ceremony.', 'docker/Traditional Japanese Matcha Ceremony Set.png', 6, 200),
    ('Miso Soup', 'A comforting bowl of traditional Japanese Miso Soup, a delicate blend of dashi broth, miso paste, tofu cubes, and seaweed. The savory umami flavors make it a soothing and authentic start to your culinary adventure.', 'docker/Miso Soup.png', 7, 60),
    ('Green Tea Ice Cream', 'Indulge in the creamy and refreshing goodness of our Green Tea Ice Cream. Made with the finest matcha, this dessert captures the delicate essence of green tea, creating a delightful and cool treat for your palate.', 'docker/Green Tea Ice Cream.png', 7, 70),
    ('Sweet Potato Fries', 'Crispy on the outside, tender on the inside – our Sweet Potato Fries are a delightful twist on the classic side dish. Seasoned to perfection, these fries offer a sweet and savory flavor that will satisfy your craving for a comforting snack.', 'docker/Sweet Potato Fries.png', 7, 50),
    ('Glass of Italian Wine', 'Elevate your dining experience with a choice of red or white Italian wine. Sip and savor the rich, complex flavors that perfectly complement the diverse dishes on our menu, adding a touch of sophistication to your culinary journey.', 'docker/Glass of Italian Wine.png', 7, 100),
    ('Coleslaw', 'Our Coleslaw is a refreshing blend of shredded cabbage, carrots, and a creamy dressing. This crunchy and tangy side dish adds a burst of freshness to your meal, making it a perfect accompaniment to the diverse flavors on your plate.', 'docker/Coleslaw.png', 7, 40),
    ('Chocolate Lava Cake', 'Indulge your sweet tooth with our decadent Chocolate Lava Cake. A rich and moist chocolate cake with a gooey, molten center, served with a scoop of velvety vanilla ice cream. It''s a divine dessert experience that will leave you craving for more.', 'docker/Chocolate Lava Cake.png', 7, 80),
    ('Indian Chai', 'Transport yourself to the streets of India with our authentic Indian Chai. This spiced tea is a perfect blend of black tea, milk, and aromatic spices, offering a warm and comforting beverage that embodies the essence of Indian culinary traditions.', 'docker/Indian Chai.png', 7, 60),
    ('Matcha-Flavored Mochi', 'Experience the delicate chewiness of our Matcha-Flavored Mochi. These Japanese rice cakes are filled with a sweetened matcha-flavored paste, creating a harmonious blend of textures and flavors in every bite.', 'docker/Matcha-Flavored Mochi.png', 7, 50),
    ('Naan Bread', 'Our Naan Bread is a soft and fluffy Indian flatbread, perfect for pairing with rich curries or enjoying on its own. Baked to perfection, it adds an authentic touch to your Spice of India experience.', 'docker/Naan Bread.png', 7, 40),
    ('Gulab Jamun', 'Indulge in the sweet bliss of Gulab Jamun – deep-fried dough balls soaked in fragrant sugar syrup, flavored with cardamom and rose water. This iconic Indian dessert is a symphony of textures and tastes that will satisfy your sweet cravings.', 'docker/Gulab Jamun.png', 7, 60),
    ('Antipasto Platter', 'Begin your Italian journey with our Antipasto Platter – a selection of cured meats, cheeses, olives, and pickled vegetables served with crusty bread. Its a perfect prelude to the pasta paradise awaiting you.', 'docker/Antipasto Platter.png', 7, 90),
    ('Tiramisu', 'Conclude your Italian feast with the classic Tiramisu. Layers of coffee-soaked ladyfingers and mascarpone cheese, dusted with cocoa powder, create a luscious and satisfying dessert that embodies the essence of Italian indulgence.', 'docker/Tiramisu.png', 7, 80);

-- 10# Table: public.BONUS

INSERT INTO public."BONUS" (bonus_name, bonus_content, bonus_score, id_item_menu)
VALUES
    ('Spice Explorer', 'Complimentary serving of traditional Indian chai with every order.', 5, 1),
    ('Tandoori Delight', 'Free naan bread with every Tandoori dish.', 10, 2),
    ('Spice Lovers Combo', '10% discount on the next Spice of India order.', 6, 3),
    ('Paneer Paradise', 'Free dessert - Gulab Jamun - with every Paneer dish.', 8, 4),
    ('Pasta Passion', 'Complimentary Italian antipasto platter with every pasta order.', 5, 5),
    ('Truffle Treat', 'Free tiramisu dessert with every Truffle dish.', 7, 6),
    ('Seafood Sensation', '10% discount on the next Pasta Paradise order.', 8, 7),
    ('Green Delight', 'Free glass of Italian wine with every Pesto dish.', 6, 8),
    ('BBQ Bliss', 'Complimentary side of coleslaw with every BBQ dish.', 8, 9),
    ('Steak Lover''s Combo', 'Free dessert - Chocolate Lava Cake - with every Steak dish.', 7, 10),
    ('Bacon Bonanza', '10% discount on the next Grill Master''s Delight order.', 6, 11),
    ('Chicken Charmer', 'Free order of sweet potato fries with every Chicken dish.', 5, 12),
    ('Sushi Enthusiast', 'Complimentary miso soup with every sushi order.', 8, 13),
    ('Dragon Delight', 'Free green tea ice cream with every Dragon Roll order.', 9, 14),
    ('Spicy Surprise', '10% discount on the next Tokyo Sushi Symphony order.', 6, 15),
    ('Tempura Treat', 'Free miso soup with every Tempura Roll order.', 7, 16),
    ('Matcha Moments', 'Complimentary matcha-flavored mochi with every tea order.', 4, 17),
    ('Sakura Serenity', 'Free Japanese fan with every Sakura Sencha order.', 3, 18),
    ('Rice Delight', '10% discount on the next Zen Tea Elegance order.', 5, 19),
    ('Zen Master', 'Free handmade ceramic tea bowl with every Matcha Ceremony Set.', 10, 20),
    ('No', 'No', 1, 21),
    ('No', 'No', 1, 22),
    ('No', 'No', 1, 23),
    ('No', 'No', 1, 24),
    ('No', 'No', 1, 25),
    ('No', 'No', 1, 26),
    ('No', 'No', 1, 27),
    ('No', 'No', 1, 28),
    ('No', 'No', 1, 29),
    ('No', 'No', 1, 30),
    ('No', 'No', 1, 31),
    ('No', 'No', 1, 32);

-- 11# Table: public.FOOD_TAGS

INSERT INTO public."FOOD_TAGS" ("id_item_menu", "id_tags") VALUES
-- #NonVegetarian
(1, 1), (2, 1), (5, 1), (9, 1), (10, 1), (11, 1), (12, 1),
-- #SpicyDish
(1, 2), (2, 2), (7, 2), (14, 2), (27, 2),
-- #IndianCuisine
(1, 3), (2, 3), (3, 3), (4, 3), (29, 3),
-- #ItalianPasta
(5, 4), (6, 4), (7, 4), (8, 4),
-- #JapaneseSushi
(13, 5), (14, 5), (15, 5), (16, 5),
-- #Seafood
(7, 6),
-- #BBQ
(9, 7), (12, 7),
-- #GrilledMeat
(2, 8), (10, 8),
-- #BaconLover
(11, 9),
-- #SashimiLover
(13, 10),
-- #SushiRolls
(16, 11), (14, 11), (15, 11),
-- #Tempura
(16, 12),
-- #BurgerDelight
(11, 13),
-- #ChickenSkewers
(12, 14),
-- #TeaLover
(17, 15), (18, 15), (19, 15), (20, 15),
-- #JapaneseTea
(17, 16), (18, 16), (19, 16), (20, 16), (22, 16),
-- #GreenTea
(22, 17),
-- #Matcha
(17, 18), (20, 18),
-- #MisoSoup
(21, 19),
-- #DessertLover
(22, 20), (26, 20), (28, 20), (31, 20),
-- #ChaiTime
(27, 21),
-- #BreadLover
(29, 22),
-- #FriedFood
(23, 23),
-- #WinePairing
(24, 24),
-- #SweetTooth
(26, 25),
-- #MochiLover
(28, 26),
-- #GlutenFreeOptions
(3, 27), (6, 27), (8, 27), (13, 27), (14, 27), (15, 27), (16, 27), (23, 27),
-- #LactoseFreeOptions
(3, 28), (6, 28), (8, 28), (13, 28), (14, 28), (15, 28), (16, 28), (23, 28),
-- #NutFree
(3, 29), (6, 29), (8, 29), (13, 29), (14, 29), (15, 29), (16, 29), (23, 29),
-- #ShellfishFree
(3, 30), (6, 30), (8, 30), (13, 30), (14, 30), (15, 30), (16, 30), (23, 30),
-- #SoyFree
(3, 31), (6, 31), (8, 31), (13, 31), (14, 31), (15, 31), (16, 31), (23, 31),
-- #Vegetarian
(3, 32), (4, 32), (6, 32), (8, 32), (23, 32), (25, 32);

-- 12# Table: public.MENU_TAGS

INSERT INTO public."MENU_TAGS" ("id_menu", "id_tags") VALUES
-- International Culinary Adventure
(1, 4), (1, 5), (1, 6), (1, 7), (1, 15), (1, 16), (1, 17),
-- Meat Lover's Feast
(2, 1), (2, 7), (2, 8), (2, 9), (2, 24),
-- Vegetarian Delights
(3, 3), (3, 4), (3, 28), (3, 32),
-- Pescatarian Paradise
(4, 6), (4, 21),
-- Grill Master's Ultimate Feast
(5, 1), (5, 7), (5, 8), (5, 9), (5, 10),
-- Japanese Tea Ceremony Experience
(6, 15), (6, 16), (6, 17), (6, 18), (6, 19), (6, 20), (6, 21), (6, 22);

-- 13# Table: public.DISCOUNT

-- Insert discount information into DISCOUNT table
INSERT INTO public."DISCOUNT" ("discount_name", "discount_percent", "id_menu") VALUES
                                                                                   ( 'Dine Around the World Combo', 15, 1),
                                                                                   ( 'Meaty Marvels Bundle', 25, 2),
                                                                                   ( 'Feast for Four Special', 30, 3),
                                                                                   ( 'Double Delight Deal', 12, 4),
                                                                                   ( 'Ultimate Grill Trio', 20, 5),
                                                                                   ( 'Taste of Japan Package', 10, 6),
                                                                                   ( 'Global Fusion Trio', 15, 7);


-- 14# Table: public.CATEGORY

-- Insert category information into CATEGORY table
INSERT INTO public."CATEGORY" ("category_name") VALUES
                                                    ( 'Legumes and grains' ),
                                                    ( 'Meat and poultry' ),
                                                    ( 'Dairy' ),
                                                    ( 'Vegetables' ),
                                                    ( 'Rice and buckwheat' ),
                                                    ( 'Green tea' ),
                                                    ( 'Spices and sauces' ),
                                                    ( 'Desserts and sweets' ),
                                                    ( 'Bread and dough' ),
                                                    ( 'Side dishes and seasonings' ),
                                                    ( 'Beverages' ),
                                                    ( 'Japanese products' ),
                                                    ( 'Other' );

-- 15# Table: public.STOCK

INSERT INTO public."STOCK" ("product_name", "product_quantity", "id_category") VALUES
-- Legumes and grains
('Basmati rice', 13, 1),
('Arborio rice', 35, 1),
('Japanese rice', 27, 1),
-- Meat and poultry
('Chicken', 49, 2),
('Lamb', 33, 2),
('Pork ribs', 3, 2),
('Skirt steak', 20, 2),
('Beef patty', 14, 2),
('Tuna', 35, 2),
('Salmon', 27, 2),
('Yellowtail', 40, 2),
('Eel', 40, 2),
('Shrimp tempura', 40, 2),
-- Dairy
('Yogurt', 12, 3),
('Cream', 35, 3),
('Parmesan cheese', 39, 3),
('Cheddar cheese', 10, 3),
('Milk', 40, 3),
('Milk solids', 27, 3),
('Mascarpone cheese', 27, 3),
-- Vegetables
('Tomatoes', 3, 4),
('Onions', 24, 4),
('Ginger', 29, 4),
('Garlic', 18, 4),
('Paneer', 15, 4),
('Zucchini', 43, 4),
('Bell peppers', 9, 4),
('Cucumber', 44, 4),
('Shredded cabbage', 12, 4),
('Carrots', 22, 4),
-- Rice and buckwheat
('Basmati rice', 27, 5),
('Arborio rice', 30, 5),
-- Green tea
('Matcha green tea', 3, 6),
('Sencha green tea', 9, 6),
('Genmaicha green tea', 29, 6),
-- Spices and sauces
('Garam masala', 40, 7),
('Cumin', 19, 7),
('Coriander', 10, 7),
('Turmeric', 37, 7),
('Paprika', 19, 7),
('Cardamom', 44, 7),
('Cloves', 6, 7),
('Cinnamon', 20, 7),
('Chimichurri sauce', 6, 7),
('Barbecue sauce', 43, 7),
('Soy sauce', 33, 7),
('Dashi broth', 34, 7),
('Miso paste', 27, 7),
('Eel sauce', 3, 7),
('Spicy mayo', 25, 7),
-- Desserts and sweets
('Chocolate cake', 43, 8),
('Molten chocolate filling', 19, 8),
('Vanilla ice cream', 45, 8),
('Sweetened matcha-flavored paste', 8, 8),
('Sugar syrup', 20, 8),
('Ladyfingers', 40, 8),
('Cocoa powder', 33, 8),
-- Bread and dough
('Brioche bun', 45, 9),
('Flour', 7, 9),
('Yeast', 46, 9),
-- Side dishes and seasonings
('Seasonings', 42, 10),
('Truffle oil', 36, 10),
('Aromatic spices', 40, 10),
-- Beverages
('Red or white Italian wine', 11, 11),
('Black tea', 27, 11),
('Coffee', 35, 11),
-- Japanese products
('Seaweed', 28, 12),
('Tofu', 8, 12),
('Traditional Japanese sweets', 22, 12),
('Pickled vegetables', 22, 12),
('Rice flour', 44, 12),
('Red bean paste', 5, 12),
-- Other
('Olive oil', 2, 13),
('Crusty bread', 21, 13),
('Rose water', 16, 13),
('Cured meats', 31, 13),
('Cheeses', 1, 13),
('Olives', 14, 13),
('Pine nuts', 34, 13);

-- 16# Table: public.PRODUCT

INSERT INTO public."PRODUCT" ("id_stock", "id_item_menu") VALUES
-- Masala Chicken Curry+
(4, 1), (21, 1), (22, 1), (23, 1), (24, 1), (36, 1), (37, 1), (38, 1), (39, 1),
-- Tandoori Lamb Kebabs+
(5, 2), (14, 2), (23, 2), (24, 2), (37, 2), (38, 2), (40, 2), (36, 2),
-- Vegetable Biryani+
(1, 3), (21, 3), (22, 3), (37, 3), (41, 3), (42, 3), (43, 3),
-- Paneer Tikka Masala+
(25, 4), (21, 4), (22, 4), (36, 4), (23, 4), (24, 4),
-- Spaghetti Carbonara+
(16, 5), (27, 5),
-- Truffle Mushroom Risotto+
(2, 6), (62, 6), (16, 6),
-- Seafood Linguine Fra Diavolo+
(13, 7), (21, 7), (24, 7), (27, 7),
-- Pesto Zucchini Noodles+
(26, 8), (21, 8), (79, 8), (16, 8),
-- Classic BBQ Ribs+
(6, 9), (45, 9), (24, 9), (40, 9),
-- Grilled Chimichurri Skirt Steak+
(7, 10), (44, 10), (24, 10), (64, 10),
-- Smoky Maple Bacon Burger+
(8, 11), (17, 11), (21, 11), (58, 11),
-- BBQ Chicken Skewers+
(4, 12), (45, 12), (27, 12), (22, 12),
-- Sashimi Sampler+
(9, 13), (10, 13), (11, 13),
-- Dragon Roll+
(28, 14), (3, 14), (49, 14),
-- Spicy Tuna Roll+
(28, 15), (3, 15), (50, 15), (9, 15), (67, 15),
-- Tempura Shrimp Uramaki+
(13, 16), (28, 16), (3, 16), (50, 16),
-- Matcha Latte+
(33, 17), (18, 17),
-- Sakura Sencha+
(34, 18),
-- Genmaicha Rice Tea+
(35, 19), (3, 19),
-- Traditional Japanese Matcha Ceremony Set+
(33, 20), (69, 20),
-- Miso Soup+
(47, 21), (48, 21), (67, 21), (68, 21),
-- Green Tea Ice Cream+
(33, 22),
-- Sweet Potato Fries+
(61, 23),
-- Glass of Italian Wine+
(64, 24),
-- Coleslaw+
(29, 25), (30, 25),
-- Chocolate Lava Cake+
(51, 26), (52, 26), (53, 26),
-- Indian Chai+
(65, 27), (18, 27), (63, 27),
-- Matcha-Flavored Mochi+
(3, 28), (54, 28),
-- Naan Bread+
(60, 29), (61, 29), (14, 29),
-- Gulab Jamun+
(60, 30), (19, 30), (56, 30), (42, 30), (76, 30),
-- Antipasto Platter+
(77, 31), (78, 31), (79, 31), (71, 31), (75, 31),
-- Tiramisu+
(57, 32), (67, 32), (20, 32), (58, 32);

-- 17# Table: public.ORDER

INSERT INTO public."ORDER" ("id_client", "status", "price", "receipt_date", "completed_date") VALUES
                                                                                                  (1, 'Completed', 240, CURRENT_DATE, CURRENT_DATE),
                                                                                                  (1, 'Completed', 540, CURRENT_DATE, CURRENT_DATE),
                                                                                                  (2, 'Completed', 460, CURRENT_DATE, CURRENT_DATE),
                                                                                                  (3, 'Completed', 1400, CURRENT_DATE, CURRENT_DATE),
                                                                                                  (3, 'Cancelled', 90, CURRENT_DATE - INTERVAL '1 day', NULL),
                                                                                                  (4, 'Completed', 180, CURRENT_DATE - INTERVAL '1 day', CURRENT_DATE - INTERVAL '1 day'),
                                                                                                  (4, 'Completed', 600, CURRENT_DATE - INTERVAL '1 day', CURRENT_DATE - INTERVAL '1 day'),
                                                                                                  (5, 'Completed', 400, CURRENT_DATE - INTERVAL '1 day', CURRENT_DATE - INTERVAL '1 day'),
                                                                                                  (1, 'In progress', 180, CURRENT_DATE, NULL),
                                                                                                  (5, 'In progress', 140, CURRENT_DATE, NULL);

-- 18# Table: public.ORDER_ITEM

INSERT INTO public."ORDER_ITEM" ("id_order", "id_menu_item", "quantity") VALUES
                                                                             (1, 1, 2),
                                                                             (2, 10, 3),
                                                                             (3, 1, 3),
                                                                             (3, 3, 1),
                                                                             (4, 10, 5),
                                                                             (4, 3, 5),
                                                                             (5, 17, 1),
                                                                             (6, 10, 1),
                                                                             (7, 20, 3),
                                                                             (8, 20, 2),
                                                                             (9, 14, 1),
                                                                             (10, 16, 1);

-- 19# Table: public.REVIEW

INSERT INTO public."REVIEW" ("id_customer", "comment", "id_menu_item", "rating") VALUES
                                                                                     (1, 'Absolutely loved the Masala Chicken Curry! The spices were perfectly balanced, and it had just the right amount of heat. As someone with a shellfish and dairy allergy, its great to find a dish that not only caters to my dietary restrictions but also tastes amazing.', 1, 5),
                                                                                     (2, 'A delightful experience! The Masala Chicken Curry is a burst of flavors. Being gluten-free due to my dietary restrictions, it''s challenging to find such a flavorful dish. Kudos for accommodating diverse diets.', 1, 4.5),
                                                                                     (3, 'BBQ Ribs done right! As a vegetarian, I usually don''t indulge in meat dishes, but I ordered these for my friends. They were a big hit! Even I couldnt resist taking a bite. The flavors were rich, and the meat was tender.', 10, 4),
                                                                                     (4, 'Despite my soy allergy, I mistakenly ordered the Classic BBQ Ribs. However, the staff was quick to rectify the mistake, and they brought me a soy-free version. The ribs were fantastic – finger-licking good with the right smokiness. Kudos to the restaurant for handling allergies so efficiently.', 10, 4.5),
                                                                                     (5, 'The Sashimi Sampler is a seafood lover''s dream! Freshness overload. As someone without any dietary restrictions, I thoroughly enjoyed the variety and quality.', 13, 5),
                                                                                     (1, 'Despite my shellfish and dairy allergy, the Sashimi Sampler provided a safe haven for me to indulge in fresh, delicious fish. The presentation was exquisite.', 13, 4.5),
                                                                                     (2, 'A delightful treat for gluten-free diners! The Vegetable Biryani was not only a visual delight but also a tasty one. The blend of spices was just perfect.', 3, 4.5),
                                                                                     (3, 'Vegetarian heaven! The Vegetable Biryani was a flavor explosion. As a vegetarian, its sometimes challenging to find dishes with such depth. This one hit the mark.', 3, 4),
                                                                                     (4, 'The sets authenticity is commendable. It truly captures the essence of a traditional Japanese matcha ceremony. The pieces are easy to clean, making it a practical choice for everyday use.', 20, 5),
                                                                                     (5, 'While the set is designed for traditional ceremonies, it''s versatile enough for everyday use. The durability of the utensils ensures long-term enjoyment, making it a worthwhile addition to any tea lover''s collection.', 20, 4),
                                                                                     (3, 'I had high hopes for the Masala Chicken Curry, but it fell short for me. The spice blend was too intense, and it didn''t cater well to my vegetarian preferences. A bit more balance in flavors would have been appreciated.', 1, 2.5),
                                                                                     (1, 'The Classic BBQ Ribs left much to be desired. As someone with a shellfish and dairy allergy, I opted for these thinking it would be a safe choice. Unfortunately, the sauce had hidden ingredients that triggered my allergies. Not a pleasant experience.', 10, 1);

-- 20# Table: public.CATALOG_MENU

INSERT INTO public."CATALOG_MENU" ("id_menu", "id_catalog") VALUES
                                                                (1, 1), -- International Culinary Adventure - Spice of India
                                                                (2, 1), -- Meat Lover's Feast - Spice of India
                                                                (3, 1), -- Vegetarian Delights - Spice of India
                                                                (1, 2), -- International Culinary Adventure - Pasta Paradise
                                                                (3, 2), -- Vegetarian Delights - Pasta Paradise
                                                                (4, 2), -- Pescatarian Paradise - Pasta Paradise
                                                                (1, 3), -- International Culinary Adventure - Grill Master's Delight
                                                                (5, 3), -- Grill Master's Ultimate Feast - Grill Master's Delight
                                                                (1, 4), -- International Culinary Adventure - Tokyo Sushi Symphony
                                                                (3, 4), -- Vegetarian Delights - Tokyo Sushi Symphony
                                                                (4, 4), -- Pescatarian Paradise - Tokyo Sushi Symphony
                                                                (6, 5), -- Japanese Tea Ceremony Experience - Zen Tea Elegance
                                                                (3, 5), -- Vegetarian Delights - Zen Tea Elegance
                                                                (7, 6), -- Global Indulgence Sampler - Tokyo Sushi Symphony
                                                                (7, 3), -- Global Indulgence Sampler - Grill Master's Delight
                                                                (7, 2), -- Global Indulgence Sampler - Pasta Paradise
                                                                (7, 1), -- Global Indulgence Sampler - Spice of India
                                                                (7, 5) -- Global Indulgence Sampler - Zen Tea Elegance