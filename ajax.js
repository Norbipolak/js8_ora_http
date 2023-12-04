/*
    Az AJAX (Asynchronous JavaScript and XML) ehy olyan HTTP
    protokoll alapú megoldás, amely segít aszinkron módon 
    kezelni a HTTP kéréseket és válaszokat.

    Ennek segítségével tudunk a JavaScripten különböző kéréseket küldeni a websszerver felé
    és a válaszokat kezelni.

    Ennek az egyik módja a fetch API, ami egy promise alapú AJAX megoldás.
    Promise-okat használ, csak elrejti ellőlünk és mi effektív nem látjuk promise-objektumokat csak tudjuk használni.
*/

//dummyJSON.com -> fake adatokat lehet kapni userekről, stb.
fetch ("https://dummyjson.com/docs/products").then((response)=>{
    console.log(response);

    response.json().then((products)=>{
        console.log(products);
    });
});

/*
    Egy response objektumot fogunk visszakapni ilyen formában:
    
body: (...) -> az adatok amit küld a szerver  
bodyUsed: false
headers: Headers {} -> headersben a fejléc adatok 
ok: true
redirected: false
status: 200 -> minden rendben 
statusText: ""
type: "cors"
url: "https://dummyjson.com/docs/products"
[[Prototype]]: Response
*/

/*ha utánaírjuk ezt   response.json().then((products)=>{
        console.log(products);
    });

akkor megkapjuk a productokat
*/