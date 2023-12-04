/* 
    Léteznek olyan folyamatok, amelyek nem azonnali lefutásúak.
    Például ilyen amikor HTTP üzeneteket küldünk a szerver felé,
    és várjuk a választ.

    Van egy kérés, és a válasz adott esetben fél másodperccel 
    késöbb érkezik meg. 

    Kezelni kell ezt az eltérést különben képtelenek leszünk feldolgozni a választ.
    Csak akkor tudjuk kezelni amikor már megérkezett. 

    Ilyen amikor letöltünk valamit és azzal az adattal/fájlal szeretnénk valamit kezdeni.
*/

const progress = document.querySelector("#progress");

function download(cb) {
    // hány százalékban töltöttük le az adott erőforrást
    let percentage = 0;
    const interval = setInterval(() => {
        percentage++;

        progress.value = percentage;

        if (percentage === 100) {
            clearInterval(interval); // a clearIntervallal megállítjuk a folyamatunkat
            cb({ impotantData: "Very important data!" });
        }

    }, 50);
}

// meg kell hívni a callback functiont 

function processData(data) {
    console.log("A következő adatot dolgozom fel: ");
    console.log(data);
};

download(processData);

/*
    Amikor a set interval lefut hozzáadunk egyet a percentage-hoz
*/

/*
    Pontról-pontra:
    1. csinálunk egy functiont ami vár egy callback function-t
    2. létrehozunk egy setInterval függvényt, amiben hozzáadunk a percentage-hez egyet, ha lefut, 50 millisecondumonként fut le, 
    ezelőtt egy let változóban a percentage-t beállítjuk 0-ra, hogy nulláról induljon. 
    3. hogy lássuk mi történik html-ben is a progress.value = percentage-vel.
    4. ha a percentage eléri a 100-t, akkor be akarjuk fejezni, ezért if(percentage === 100){
        clearInterval(interval) -> ugyanitt meghivjuk a callback functionünket
        cb({importantData: this is very important data!})
    }
    5. csinálunk egy processData függvényt, ami ki fog valamit loggolni 
    6. utolsó lépés, hogy meghívjuk a download függvényt a processData függvénnyel -> download(processData);
*/

/*************************************************************************************/

/*
    A fenti is egy megoldása, hogy az aszinkron folyamatokat kezeljük.
    
    Az aszinkron azt jelenti, hogy elkezdödik egy folyamat valamikor,
    és késöbb ér véget. Az adott folyamat nem akasztja meg a többi folyamatot.
    Tipikusan ilyen a setInterval
 */


//indít egy új szálat és nem várakoztatja a többi folyamatot, azért lényeges mert pl. egy folyamat tíz másodpercbe telik 
// és a kliens addig nem fogja tudni elindítani a többi függvényt az eventlistenerekkel, ezért léteznek az aszinkron folyamatok.
setInterval(() => {
    console.log("mint ezt.");
}, 1000);

console.log("Nekem ezt elöbb fogja kíírni");


/*
    A promise a JavaScript hivatalos objektum alapú megoldása aszinkron folyamatok kezelésére.

    ***Resolve***
    A resolve-ot akkor hívjuk meg, ha minden rendben ment.
    ***Reject***
    A reject-et akkor hívjuk meg, ha valami hiba történt.
*/
function downloadPromise() {
    let percentage = 0;

    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            percentage++;

            progress.value = percentage;

            if (percentage === 100) {
                clearInterval(interval);

                const rand = Math.floor(Math.random() * 2);

                if (rand === 1) {
                    resolve({ importantData: "Very important data!" })
                } else
                    reject({ error: "Something went wrong!" }); // ha meghívjuk akkor olyan, mintha dobtunk volna egy hibát (throw-t használtuk volna)
            }
        }, 50);
    });
}

/*
    A then a promise objektumnak a metódusa.
    Akkor hívódik meg, hogyha a resolve-ot meghívjuk.
    Olyan mintha tudnánk a resolve-ot a then-vel azonosítani.
    Ha meghívjuk a resolve-ot akkor megyünk bele a thenbe.
*/
downloadPromise().then.apply((data) => {
    console.log("A következő adatot dolgozom fel: ");
    console.log(data);
}).catch((err) => {
    // A catch ág elkapja a hibát.
    console.log(err);
});

// aszinkron függvény 
async function promiseHandler() {
    /*
        Az await bevárja a választ.
        Hogyha aszinkron folyamatokat 
        kezelünk aszinkron függvénnyel, 
        akkor mindig érdemes try-catch 
        blokkot alklmazni.
    */
    try {
        const response = await downloadPromise();
        console.log(response);
    } catch (err) {
        console.log(err);
    }
}
promiseHandler();

/*
    Lépésről-lépésre
    1. csinálunk egy függvényt aminek a neve ebben az esetben downloadPromise, nem kell callback függvény 
    2. return new Promise ami kap két callback függvényt értékként. resolve-reject 
    3. ugyanugy mint előbb létrehozunk egy intervalt amit egyenlővé teszünk a egy setInterval függvénnyel,
    ugyanitt percentage++ és progress.value = percentage
    4. if-vel ha a percentage eléri a 100-t clearInterval(interval)
    5. Math.floor(Math.random()*2) segítségével csinálunk eseteket (2 db lehetséges eset)
    6. if-vel ha ez a random szám egyenlő eggyel, akkor resolve -> resolve({ importantData: "Very important data!" })
    másik esetben (else) -> reject({ error: "Something went wrong!" });
    7. a függvény meghívásánál van két lehetőségünk: (await, then)
    
    downloadPromise().then.apply((data) => {
    console.log("A következő adatot dolgozom fel: ");
    console.log(data);
}).catch((err) => {
    // A catch ág elkapja a hibát.
    console.log(err);

    másik megoldás pedig:
    async function promiseHandler() {
   
        try {
            const response = await downloadPromise();
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }
    promiseHandler();
*/



