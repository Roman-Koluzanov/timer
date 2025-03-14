import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [time, setTime] = useState(0); // Время в секундах
  const [isRunning, setIsRunning] = useState(false); // Статус секундомера (запущен/остановлен)

  // Форматирование времени
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Таймер с использованием useEffect
  useEffect(() => {
    let interval;
    
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1); // Увеличиваем время на 1 секунду
      }, 1000);
    } else {
      clearInterval(interval); // Останавливаем таймер, если он не работает
    }

    return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
  }, [isRunning]);

  // Обработчик нажатия кнопки Старт/Стоп
  const handleStartStop = () => {
    setIsRunning((prevState) => !prevState); // Переключаем состояние запуска
  };

  // Обработчик нажатия кнопки Сброс
  const handleReset = () => {
    setTime(0); // Сбрасываем время
  };

  return (
    <div style={styles.container}>
      <div style={styles.timer}>
        {formatTime(time)} {/* Отображаем форматированное время */}
      </div>
      <div style={styles.buttons}>
        <button onClick={handleStartStop} style={styles.button}>
          {isRunning ? 'Стоп' : 'Старт'}
        </button>
        {time > 0 && (
          <button onClick={handleReset} style={styles.button}>
            Сброс
          </button>
        )}
      </div>
    </div>
  );
};

// Стиль для компонента
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f7f7f7',
  },
  timer: {
    fontSize: '3rem',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  buttons: {
    display: 'flex',
    gap: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#4CAF50',
    color: 'white',
    transition: 'background-color 0.3s',
  },
};

export default Timer;
