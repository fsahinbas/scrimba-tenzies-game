import React from "react";
import styles from "./main.module.css";
import Dice from "./dice/Dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

const Main = () => {
  const generateDice = () => {
    const num = Math.floor(Math.random() * 6) + 1;
    return { id: nanoid(), value: num, isHeld: false };
  };

  const generateDices = () => {
    let dices = [];
    for (let i = 0; i < 10; i++) {
      dices.push(generateDice());
    }
    return dices;
  };
  const [dices, setDices] = React.useState(generateDices);
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dices.every((dice) => dice.isHeld);
    const firstDiceValue = dices[0].value;
    const allSameValue = dices.every((dice) => dice.value === firstDiceValue);
    allHeld && allSameValue && setTenzies(true);
    console.log(tenzies);
  }, [dices]);

  const holdDice = (id) => {
    setDices((prevDices) =>
      prevDices.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
      })
    );
  };
  const handleClick = () => {
    if (tenzies) {
      setTenzies(false);
      setDices(generateDices());
    } else {
      setDices((prevDices) =>
        prevDices.map((dice) => {
          return dice.isHeld ? dice : generateDice();
        })
      );
    }
  };

  const diceElements = dices.map((dice) => (
    <Dice
      key={dice.id}
      value={dice.value}
      isHeld={dice.isHeld}
      holdDice={() => holdDice(dice.id)}
    />
  ));

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Tenzies</h1>
        <p className={styles.desc}>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className={styles.diceWrapper}>{diceElements}</div>
        <button className={styles.btnRoll} onClick={handleClick}>
          {tenzies ? "New Game" : "Roll"}
        </button>
        {tenzies && (
          <Confetti width={320} height={320} className={styles.confetti} />
        )}
      </div>
    </main>
  );
};

export default Main;
