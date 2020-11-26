// CONST


const attackButton = document.getElementById('attackButton')
const pcHealth = document.getElementById('pcHealth')
const pcName = document.getElementById('pcName')
const club = document.getElementById('club')
const sword = document.getElementById('sword')
const magicWand = document.getElementById('magicWand')
const bow = document.getElementById('bow')
const playerWeaponDiv = document.getElementById('playerWeaponDiv')
const coin = document.getElementById('coinBox')
const healthPotion = document.getElementById('healthPotion')
const pcImg = document.getElementById('pcImg')
const healCounter = document.getElementById('healCounter')
const pcHealthCounter = document.getElementById('pcHealthCounter')

//LETS

let currentWeapon = ""
let playerWeapon = document.getElementById('playerWeapon')
let pcDamage = 0
let userDamage = 0
let coins = 250
let pcMaxDamage = 0
let eCounter = 0
let raidBossCounter = 0
let userHealth = document.getElementById('userHealth')
let enemies = [
    {
        name: "Goblin",
        img: "https://i.imgur.com/yBh7Fn4.png",
        health: 100,
        maxDamage: 12
    },
    {
        name: "Troll",
        img: "http://i.pinimg.com/originals/8d/7f/d8/8d7fd8ae9fcd6060497c628e1c7944b4.jpg",
        health: 120,
        maxDamage: 8
    },
    {
        name: "Witch",
        img: "http://i.pinimg.com/originals/c0/da/c0/c0dac0da46b4c59534cf898b1967d523.png",
        health: 80,
        maxDamage: 15
    },
    {
        name: "Brazas",
        img: "https://s1.15min.lt/images/photos/2010/07/08/original/1278580464brazauskas.jpg",
        health: 1000,
        maxDamage: 15
    }
]
let weapons = {
    club: {
        img: "https://i.pinimg.com/originals/13/5d/7b/135d7b8a2ea41db95e1c48703f58c244.jpg",
        damage: 5,
    },
    sword: {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjeRzen..",
        damage: 10,
        effect: 'gives player 25% chance to doge enemy attacks',
        price: 75
    },
    magicWand: {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYLtdkk..",
        damage: 12,
        effect: 'heals player on every enemy hit from 0 to 5 hit points',
        price: 150
    },
    bow: {
        img: "https://preview.pixlr.com/images/800wm/100/1/1001468630.jpg",
        damage: 7,
        effect: 'has a 50% chance to hit enemy two times in a row',
        price: 100
    },
    potion: {
        img: "https://preview.pixlr.com/images/450nwm/100/1/1001468594.jpg",
        info: "can be bought from shop for 50 coins, recovers player health when bought",
    }
}
let methods = {
    showCoins: () => {
        if (raidBossCounter === 10){
            coins += Math.round(Math.random() * 10)*2
            coin.innerHTML = coins
            console.log(coins)
        }
        coins += Math.round(Math.random() * 10)
        coin.innerHTML = coins
        console.log(coins)
    },
    enemyCounter: (num) => {
        pcName.innerHTML = enemies[num].name
        pcHealth.value = enemies[num].health
        pcMaxDamage = enemies[num].maxDamage
        pcImg.src = enemies[num].img
        pcHealth.value = enemies[num].health
        pcHealth.max = enemies[num].health
        pcHealthCounter.innerHTML = pcHealth.value
},
    enemyCheck: () => {
        if (pcHealth.value <= 0 && raidBossCounter < 10) {
            eCounter++
            console.log("eCounter: " + eCounter)
            raidBossCounter++
            console.log("raidBossCounter : " + raidBossCounter)
            if (raidBossCounter === 10) {
                methods.enemyCounter(3)
                return
            }
            if (eCounter === 3) {
                eCounter = 0
            }
            methods.enemyCounter (eCounter)
        }
        if (pcHealth.value <= 0 && raidBossCounter === 10) {
            let i = Math.round(Math.random() * 20)
            let z = Math.round(Math.random() * 20)
            let j = Math.round(Math.random() * 20)

            weapons.newWeapon = {
                img: "https://steamuserimages-a.akamaihd.net/ugc/137752681297741675/489FF5CB3381377778890A8DA2D925BC1559D59A/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
                damage: i,
                healthRegen: z,
                blockChance: j,
            }
            randomWeapon()
        }
    },
    userDamage: () => {
        pcHealth.value -= userDamage
        pcHealthCounter.innerHTML = pcHealth.value
        console.log("User damage: " + userDamage)

},
    pcDamage: () => {
        userHealth.value -= pcDamage
        healCounter.innerHTML = userHealth.value
        console.log("PC damage: " + pcDamage)
        if (userHealth.value <= 0) {
            alert("YOU DIED")
        }
    }
}
//LISTENERS


attackButton.addEventListener("click", kambat)
club.addEventListener("click", changeWeapon1)
sword.addEventListener("click", changeWeapon2)
magicWand.addEventListener("click", changeWeapon3)
bow.addEventListener("click", changeWeapon4)
healthPotion.addEventListener("click", healing)


//FUNCTIONS


currentWeapon = "club"
pcName.innerHTML = enemies[0].name
pcHealth.value = enemies[0].health
pcMaxDamage = enemies[0].maxDamage
coin.innerHTML = coins
healCounter.innerHTML = userHealth.value
pcHealthCounter.innerHTML = pcHealth.value


function kambat () {

    if (currentWeapon === "club") {
        userDamage = weapons.club.damage
        pcDamage = Math.round(Math.random() * pcMaxDamage)

        methods.userDamage()
        methods.pcDamage()
        methods.showCoins()
        methods.enemyCheck()
        methods.enemyCounter

    }
    
    if (currentWeapon === "sword"){
        userDamage = weapons.sword.damage

        methods.userDamage()
        methods.showCoins()

        if (Math.round(Math.random() * 4) === 1) {
            console.log("DODGE")
        } else {
            pcDamage = Math.round(Math.random() * pcMaxDamage)

            methods.pcDamage()
            methods.enemyCheck()
            methods.enemyCounter

        }
    }

    if (currentWeapon === "magicWand"){
        userHealth.value += Math.round(Math.random() * 5)
        pcDamage = Math.round(Math.random() * pcMaxDamage)
        userDamage = weapons.magicWand.damage

        methods.userDamage()
        methods.pcDamage()
        methods.showCoins()
        methods.enemyCheck()
        methods.enemyCounter

    }

    if (currentWeapon === "bow"){
        if (Math.round(Math.random() * 2 > 1)) {
            userDamage = weapons.bow.damage * 2
            pcDamage = Math.round(Math.random() * pcMaxDamage)

            methods.userDamage()
            methods.pcDamage()
            methods.showCoins()
            methods.enemyCheck()
            methods.enemyCounter

        } else {
            userDamage = weapons.bow.damage
            pcDamage = Math.round(Math.random() * pcMaxDamage)

            methods.userDamage()
            methods.pcDamage()
            methods.showCoins()
            methods.enemyCheck()
            methods.enemyCounter
        }
    }

    if (currentWeapon === "newWeapon"){

        userHealth.value += weapons.newWeapon.healthRegen
        pcDamage = Math.round(Math.random() * pcMaxDamage)
        userDamage = weapons.newWeapon.damage

        if (Math.random() <= weapons.newWeapon.blockChance/100 ) {
    console.log("BLOCK")
            methods.userDamage()
            methods.showCoins()
            methods.enemyCheck()
            methods.enemyCounter
        } else {
            methods.userDamage()
            methods.pcDamage()
            methods.showCoins()
            methods.enemyCheck()
            methods.enemyCounter
        }
    }
}

function changeWeapon1 () {
    playerWeaponDiv.innerHTML = `
     <div id="tooltip1">
        <img src="https://i.pinimg.com/originals/13/5d/7b/135d7b8a2ea41db95e1c48703f58c244.jpg" class="weaponImg" id="club">
        <span id="tooltiptext1">Weapon name: CLUB<br>Damage: 5<br>Effect:
        No effect<br>Price:0 (Default Weapon)</span>
        </div>
    `
    currentWeapon = "club"
    console.log(currentWeapon)
}

function changeWeapon2 () {
    if (coins >= 75) {
        coins -= 75
        coin.innerHTML = coins
        playerWeaponDiv.innerHTML = `
                    <div id="tooltip1">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRjeRzenAFh9nuqc0sexfw63azpjKmulkubHg&usqp=CAU" class="weaponImg"
                             id="sword">
                        <span id="tooltiptext1">Weapon name: SWORD<br>Damage: 10<br>Effect:
                        Gives player 25% chance to doge enemy attacks.<br>Price: 75 Coins</span>
                    </div>
    `
        currentWeapon = "sword"
        console.log(currentWeapon)
    } else {
        alert("You dont have enough coins")
    }
}

function changeWeapon3 () {
    if (coins >= 150) {
        coins -= 150
        coin.innerHTML = coins
        playerWeaponDiv.innerHTML = `
                    <div id="tooltip1">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRYLtdkk7fwbEwdjNpuL0Oo1ka5A7z0PhL34Q&usqp=CAU" class="weaponImg"
                        id="magicWand">
                        <span id="tooltiptext1">Weapon name: MAGIC WAND<br>Damage: 12<br>Effect:
                        Heals player on every enemy hit from 0 to 5 hit points.<br>Price: 150 Coins</span>
                    </div>
    `
        currentWeapon = "magicWand"
        console.log(currentWeapon)
    } else {
        alert("You dont have enough coins")
    }
}

function changeWeapon4 () {
    if (coins >= 100) {
        coins -= 100
        coin.innerHTML = coins
        playerWeaponDiv.innerHTML = `
                    <div id="tooltip1">
                        <img src="https://preview.pixlr.com/images/800wm/100/1/1001468630.jpg" class="weaponImg" id="bow">
                        <span id="tooltiptext1">Weapon name: BOW<br>Damage: 7<br>Effect:
                        Gives player 25% chance to doge enemy attacks.<br>Price: 100 Coins</span>
                    </div>
    `
        currentWeapon = "bow"
        console.log(currentWeapon)
    } else {
        alert("You dont have enough coins")
    }
}

function randomWeapon () {
    playerWeaponDiv.innerHTML = `
                    <div id="tooltip1">
                        <img src="${weapons.newWeapon.img}" class="weaponImg" id="newWeapon">
                        <span id="tooltiptext1">Weapon name: Brazausko kulokas<br>Damage: ${weapons.newWeapon.damage}<br>Effect:
                        Health regeneration after successful hit ${weapons.newWeapon.healthRegen}<br>
                        Block chance after successful hit ${weapons.newWeapon.blockChance}%
                        </span>
                    </div>
    `
    currentWeapon = "newWeapon"
    console.log(currentWeapon)
}

function healing () {
    if (coins >= 50) {
        userHealth.value += 100
        coins -= 50
        coin.innerHTML = coins
    } else {
        alert("You dont have enough coins")
    }
}