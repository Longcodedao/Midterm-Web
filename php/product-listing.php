<?php
require_once "admin/php/databases.php";
$query = "SELECT * FROM products";
$result = $conn->query($query);

while ($row = $result->fetch_assoc()) {
    echo <<< _END

        <div class="col d-flex mb-4">
            <a href="product-detail-customer-html.php?id={$row['id']}">
              <div class="card-wrapper">
                <div class="card product-wrapper animate">
                  <img
                    src="{$row['image']}"
                    alt="Item image"
                    class="card-img-top"
                  />
                  <div class="card-body text-center product-card-body">
                    <h5 class="card-title">{$row['name']}</h5>
                    <p class="card-text">
                      {$row['description']}
                    </p>
                    <h6 class="card-subtitle mb-1">Price: $<span>{$row['price']}</span></h6>
                  </div>
                  <div
                    class="p-3 text-center text-white mt-1 buying-button cursor"
                  >
                    <span class="text-uppercase" id = {$row['id']}>BUY NOW</span>
                  </div>
                </div>
              </div>
            </a>
          </div>

    _END;
}