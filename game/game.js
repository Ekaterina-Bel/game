
class Character {
    constructor(race, name, height, weight, age) {
        this.race = race;
        this.name = name;
        this.height = height;
        this.weight = weight;
        this.age = age;
        this.health = 100;
    }
    
    attack(target) {
        const damage = this.weapon - target.armor;
        target.health -= damage > 0 ? damage : 1;
        console.log(`${this.name} бьет ${target.name}!
Урон: ${damage > 0 ? damage : 1}
Здоровье ${target.name}: ${target.health}`);
    }
    
    isAlive() {
        return this.health > 0;
    }
}


class Orc extends Character {
    constructor(name) {
        super("Орк", name, 210, 120, 35);
        this.weapon = 30;
        this.armor = 15;
    }
}


class Dwarf extends Character {
    constructor(name) {
        super("Гном", name, 140, 90, 150);
        this.weapon = 25;
        this.armor = 20;
    }
}


class Human extends Character {
    constructor(name) {
        super("Человек", name, 180, 80, 25);
        this.weapon = 28;
        this.armor = 12;
    }
}


class Elf extends Character {
    constructor(name) {
        super("Эльф", name, 190, 70, 200);
        this.weapon = 32;
        this.armor = 8;
    }
}


function startFight(fighter1, fighter2) {
    console.log(`\n🥊 ${fighter1.name} vs ${fighter2.name}`);
    
    while (fighter1.isAlive() && fighter2.isAlive()) {
        fighter1.attack(fighter2);
        if (!fighter2.isAlive()) break;
        
        fighter2.attack(fighter1);
        if (!fighter1.isAlive()) break;
    }
    
    if (fighter1.isAlive()) {
        console.log(`\n🏆 ПОБЕДИТЕЛЬ: ${fighter1.name}!`);
    } else {
        console.log(`\n🏆 ПОБЕДИТЕЛЬ: ${fighter2.name}!`);
    }
}


const fighters = [
    new Orc("Хуипутало"),
    new Dwarf("Липтон"),
    new Human("Лепешка"),
    new Elf("Бибинос")
];


for (let i = 0; i < fighters.length; i++) {
    for (let j = i + 1; j < fighters.length; j++) {
        // Клонируем бойцов для чистого боя
        const fighter1 = {...fighters[i], health: 100};
        const fighter2 = {...fighters[j], health: 100};
        Object.setPrototypeOf(fighter1, Object.getPrototypeOf(fighters[i]));
        Object.setPrototypeOf(fighter2, Object.getPrototypeOf(fighters[j]));
        
        startFight(fighter1, fighter2);
    }
}