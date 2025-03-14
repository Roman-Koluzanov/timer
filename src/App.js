import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(0); // Время в миллисекундах
  const [isRunning, setIsRunning] = useState(false); // Статус секундомера (запущен/остановлен)

  // Форматирование времени (часы:минуты:секунды:миллисекунды)
  const formatTime = (timeInMilliseconds) => {
    const hours = Math.floor(timeInMilliseconds / 3600000); // 1 час = 3600000 миллисекунд
    const minutes = Math.floor((timeInMilliseconds % 3600000) / 60000); // 1 минута = 60000 миллисекунд
    const seconds = Math.floor((timeInMilliseconds % 60000) / 1000); // 1 секунда = 1000 миллисекунд
    const milliseconds = timeInMilliseconds % 1000; // Остаток от деления на 1000 - это миллисекунды

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;
  };

  // Таймер с использованием useEffect
  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Увеличиваем время на 10 миллисекунд
      }, 10); // обновление времени каждую 10 миллисекунду
    } else {
      clearInterval(interval); // Останавливаем таймер
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
    <div className="App">
      <header className="App-header">
        <div style={styles.timer}>
          {formatTime(time)} {/* Отображаем форматированное время с миллисекундами */}
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
      </header>
    </div>
  );
}

// Стиль для компонента
const styles = {
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

export default App;
