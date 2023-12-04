/*
    A JSON(Javascript Object Notation) a Javascript 
    objektumon alapuló adatszerkezet.

    Stringben küldünk Javascript objektumot
*/

const User = {
    email:"user@user.hu",
    userName:"user01",
    pass:"secret-password"
};

// ezt át tudjuk alakítani strin-é a json stringify segítségével.

const strUserData = JSON.stringify(User);
console.log(strUserData); // {"email":"user@user.hu","userName":"user01","pass":"secret-password"}

/*
    Annak a módja, hogy karaktereket küldjünk a hálozaton keresztül már régen meg van,
    és ezért csak azt mondjuk, hogy karakterekké alakítjuk és azt mondjuk a content-type-val 
    a webszervernek, hogy ezt majd értelmezze JSON objektumként és alakítsa vissza sima JavaScript objektummá
    vagy amivé akarja (neki vissza kell alakítania ezeket az adatokat amiket mi elküldtünk JSON-ként)
*/

// stringből visszaalakítás

const UserObj = JSON.parse(strUserData);
console.log(UserObj); // { email: 'user@user.hu', userName: 'user01', pass: 'secret-password' }