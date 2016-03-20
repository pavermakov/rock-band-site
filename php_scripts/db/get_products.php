<?php

$products = $database->select("products", ["product_name", "product_price", "product_image"]);