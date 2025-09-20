// Singleton 
class Game {
    constructor() {
        if (Game.instance) {
            return Game.instance;
        }
        Game.instance = this;
        this.characters = [];
        return this;
    }

    addCharacter(character) {
        this.characters.push(character);
    }

    fight() {
        console.log("начало битвы");
        
        // Простая битва - каждый бьет каждого
        for (let i = 0; i < this.characters.length; i++) {
            for (let j = 0; j < this.characters.length; j++) {
                if (i !== j) {
                    this.characters[i].attack(this.characters[j]);
                }
            }
        }
        
        console.log("конец битвы");
    }
}

// Fabric
class WeaponFactory {
    static createWeapon(type, damage) {
        switch (type) {
            case 'sword':
                return { type: 'Меч', damage };
            case 'halberd':
                return { type: 'Алебарда', damage: damage + 5 };
            default:
                return { type: 'Меч', damage };
        }
    }
}

// Базовый класс персонажа
class Character {
    constructor(builder) {
        this.race = builder.race;
        this.height = builder.height;
        this.weight = builder.weight;
        this.age = builder.age;
        this.weapon = builder.weapon;
        this.armor = builder.armor;
        this.health = 100;
    }

    calculateTotalArmor() {
        return Object.values(this.armor).reduce((total, item) => total + (item?.protection || 0), 0);
    }

    attack(target) {
        const damage = this.weapon.damage - target.calculateTotalArmor();
        const actualDamage = Math.max(0, damage);
        
        target.health -= actualDamage;
        
        console.log(`${this.race} атакует ${target.race} с помощью ${this.weapon.type}!`);
        console.log(`Урон: ${actualDamage}, Здоровье ${target.race}: ${Math.max(0, target.health)}`);
        
        if (target.health <= 0) {
            console.log(`💀 ${target.race} повержен!`);
        }
        console.log('---');
    }
}

// builder
class CharacterBuilder {
    constructor(race) {
        this.race = race;
        setPhysicalCharacteristics();
        this.weapon = null;
        this.armor = {};
    }

    setPhysicalCharacteristics() {
        this.physicalCharacteristics = {
            height: 0,
            weight: 0,
            age: 0
        }
    }
    setHeight(height) {
        this.height = height;
        return this;
    }

    setWeight(weight) {
        this.weight = weight;
        return this;
    }

    setAge(age) {
        this.age = age;
        return this;
    }

    setWeapon(weaponType, damage) {
        this.weapon = WeaponFactory.createWeapon(weaponType, damage);
        return this;
    }

    setArmor(chest, helmet, leggings, pants) {
        this.armor = {
            chest: { type: 'Доспех', protection: chest },
            helmet: { type: 'Шлем', protection: helmet },
            leggings: { type: 'Поножи', protection: leggings },
            pants: { type: 'Штаны', protection: pants }
        };
        return this;
    }

    build() {
        return new Character(this);
    }
}

//классы рас
class Orc extends Character {
    constructor(builder) {
        super(builder);
    }
}

class Dwarf extends Character {
    constructor(builder) {
        super(builder);
    }
}

class Human extends Character {
    constructor(builder) {
        super(builder);
    }
}

class Elf extends Character {
    constructor(builder) {
        super(builder);
    }
}


const game = new Game();

const orc = new CharacterBuilder('Орк')
    .setHeight(220)
    .setWeight(120)
    .setAge(35)
    .setWeapon('halberd', 25)
    .setArmor(10, 5, 8, 2)
    .build();

const dwarf = new CharacterBuilder('Гном')
    .setHeight(140)
    .setWeight(80)
    .setAge(150)
    .setWeapon('sword', 20)
    .setArmor(12, 6, 10, 3)
    .build();

const human = new CharacterBuilder('Человек')
    .setHeight(180)
    .setWeight(85)
    .setAge(30)
    .setWeapon('sword', 18)
    .setArmor(8, 4, 6, 2)
    .build();

const elf = new CharacterBuilder('Эльф')
    .setHeight(190)
    .setWeight(70)
    .setAge(200)
    .setWeapon('halberd', 22)
    .setArmor(6, 3, 4, 1)
    .build();


game.addCharacter(orc);
game.addCharacter(dwarf);
game.addCharacter(human);
game.addCharacter(elf);


game.fight();