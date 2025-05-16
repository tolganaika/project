import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function App() {
  const [showRegister, setShowRegister] = useState(false);


  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');

  
  const handleRegisterChange = e => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    setRegisterError('');
    setRegisterSuccess('');
  };

  
  const handleRegisterSubmit = e => {
    e.preventDefault();
    if (!registerData.name || !registerData.email || !registerData.password) {
      setRegisterError('Барлық өрісті толтырыңыз!');
      return;
    }
    localStorage.setItem('fitapp_user', JSON.stringify(registerData));
    setRegisterSuccess('Тіркелу сәтті өтті!');
    setRegisterData({ name: '', email: '', password: '' });
    setTimeout(() => {
      setShowRegister(false);
      setRegisterSuccess('');
    }, 1200);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <nav className="fixed top-0 left-0 w-full z-50 bg-purple-600 text-white p-4 flex justify-between shadow">
          <h1 className="text-xl font-bold">Фитнес жаттықтырушы</h1>
          <ul className="flex gap-4 items-center">
            <li><Link to="/" className="hover:underline">Басты бет</Link></li>
            <li><Link to="/workouts" className="hover:underline">Жаттығулар</Link></li>
            <li><Link to="/nutrition" className="hover:underline">Тамақтану</Link></li>
            <li><Link to="/chat" className="hover:underline">Чат</Link></li>
            <li>
              <button
                onClick={() => setShowRegister(true)}
                className="ml-4 px-4 py-1 bg-white text-purple-700 rounded border border-purple-200 hover:bg-purple-50 transition"
              >
                Тіркелу
              </button>
            </li>
          </ul>
        </nav>

        {showRegister && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(45,26,69,0.15)' }}
            onClick={() => setShowRegister(false)}
          >
            <form
              className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm relative flex flex-col gap-4"
              onClick={e => e.stopPropagation()}
              onSubmit={handleRegisterSubmit}
            >
              <button
                className="absolute top-2 right-3 text-gray-400 hover:text-purple-600 text-2xl"
                onClick={() => setShowRegister(false)}
                type="button"
                aria-label="Жабу"
              >
                ×
              </button>
              <h2 className="text-xl font-bold text-purple-700 mb-2 text-center">Тіркелу</h2>
              <input
                type="text"
                name="name"
                value={registerData.name}
                onChange={handleRegisterChange}
                placeholder="Атыңыз"
                className="border rounded p-2 focus:outline-none focus:border-purple-400 transition"
              />
              <input
                type="email"
                name="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                placeholder="Email"
                className="border rounded p-2 focus:outline-none focus:border-purple-400 transition"
              />
              <input
                type="password"
                name="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                placeholder="Құпиясөз"
                className="border rounded p-2 focus:outline-none focus:border-purple-400 transition"
              />
              <button
                className="bg-purple-600 text-white rounded p-2 mt-2 hover:bg-purple-700 transition"
                type="submit"
              >
                Тіркелу
              </button>
              {registerError && <div className="text-red-600 text-center">{registerError}</div>}
              {registerSuccess && <div className="text-green-600 text-center">{registerSuccess}</div>}
            </form>
          </div>
        )}

        <main className="p-6 mt-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/chat" element={<ChatAssistant />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}







function Home() {
  const quotes = [
    "Бүгінгі күш — ертеңгі нәтиже!",
    "Жеңіс — табандылықта.",
    "Кішкентай қадамдар үлкен нәтижеге жеткізеді.",
    "Өзіңе сен, бәрі мүмкін!"
  ];
  const quote = quotes[new Date().getDay() % quotes.length];

  const tips = [
    "Күніне 2 литр су ішіңіз.",
    "Ұйқыңызды қадағалаңыз.",
    "Жаттығудан кейін созылуды ұмытпаңыз.",
    "Таза ауада серуендеңіз."
  ];
  const tip = tips[new Date().getDay() % tips.length];

  
  const dailyTasksList = [
    {
      morning: [
        "10 минут созылу",
        "1 литр су ішу",
        "5 минут тыныс алу жаттығуы",
        "Жеңіл таңғы ас",
        "10 минут йога",
        "10 рет планка",
        "Күнделікке жоспар жазу",
        "5 минут медитация"
      ],
      evening: [
        "Жаяу жүру (5000 қадам)",
        "1 литр су ішу",
        "20 минут кітап оқу",
        "Көкөніс жеу",
        "5 минут созылу",
        "Экран алдында уақытты шектеу",
        "Кешкі ас жеңіл болсын",
        "Ұйқы алдында тыныс алу"
      ]
    },
    {
      morning: [
        "15 минут кардио",
        "Жеміс жеу",
        "1 стакан су",
        "5 минут созылу",
        "10 рет пресс",
        "Таңғы серуен",
        "Күн сәулесін қабылдау",
        "Күліп ояну"
      ],
      evening: [
        "Созылу жаттығуы",
        "Көкөніс жеу",
        "Жаяу серуендеу",
        "2 стакан су",
        "Кешкі асқа ақуыз",
        "10 минут тыныштық",
        "Кітап оқу",
        "Ұйқы алдында телефонсыз болу"
      ]
    },
    {
      morning: [
        "20 минут күш жаттығуы",
        "Сүт өнімін ішу",
        "10 минут созылу",
        "Жеңіл таңғы ас",
        "5 минут тыныс алу",
        "10 рет отжимание",
        "Күнделік жазу",
        "Таңғы душ"
      ],
      evening: [
        "Жаяу серуендеу",
        "Планка 1 минут",
        "Көкөніс жеу",
        "1 стакан су",
        "Кешкі ас жеңіл болсын",
        "5 минут созылу",
        "Кітап оқу",
        "Ұйқы алдында тыныс алу"
      ]
    },
    {
      morning: [
        "10 минут йога",
        "1 литр су ішу",
        "5 минут медитация",
        "Жеңіл таңғы ас",
        "10 минут созылу",
        "Күн сәулесін қабылдау",
        "Күнделікке жоспар жазу",
        "Таңғы серуен"
      ],
      evening: [
        "Көкөніс жеу",
        "2,5 литр су ішу",
        "Жаяу жүру (3000 қадам)",
        "Кешкі асқа ақуыз",
        "5 минут тыныс алу",
        "Кітап оқу",
        "Экран алдында уақытты шектеу",
        "Ұйқы алдында тыныштық"
      ]
    },
    {
      morning: [
        "15 минут велосипед",
        "Жеңіл таңғы ас",
        "10 минут созылу",
        "1 стакан су",
        "5 минут тыныс алу",
        "10 рет пресс",
        "Күн сәулесін қабылдау",
        "Таңғы серуен"
      ],
      evening: [
        "Созылу",
        "Жеңіл кешкі ас",
        "Көкөніс жеу",
        "Кітап оқу",
        "5 минут медитация",
        "Кешкі серуен",
        "Экран алдында уақытты шектеу",
        "Ұйқы алдында тыныс алу"
      ]
    },
    {
      morning: [
        "Демалыс",
        "Кітап оқу",
        "Жеңіл таңғы ас",
        "5 минут тыныс алу",
        "Күн сәулесін қабылдау",
        "Таңғы серуен",
        "Күнделік жазу",
        "10 минут созылу"
      ],
      evening: [
        "Жаяу жүру (3000 қадам)",
        "Медитация",
        "Көкөніс жеу",
        "Кешкі ас жеңіл болсын",
        "5 минут тыныштық",
        "Кітап оқу",
        "Экран алдында уақытты шектеу",
        "Ұйқы алдында тыныс алу"
      ]
    },
    {
      morning: [
        "15 минут HIIT",
        "Жеміс жеу",
        "1 стакан су",
        "10 минут созылу",
        "Күн сәулесін қабылдау",
        "Таңғы серуен",
        "Күнделікке жоспар жазу",
        "5 минут тыныс алу"
      ],
      evening: [
        "Күні бойы қозғалыста болу",
        "Планка 1 минут",
        "Көкөніс жеу",
        "Кешкі ас жеңіл болсын",
        "5 минут созылу",
        "Кітап оқу",
        "Экран алдында уақытты шектеу",
        "Ұйқы алдында тыныс алу"
      ]
    }
  ];


  const today = new Date().getDay();

  
  const morningKey = `fitapp_morning_${today}`;
  const eveningKey = `fitapp_evening_${today}`;


  function getInitialTasks(key, arr) {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return arr.map(text => ({ text, done: false }));
      }
    }
    return arr.map(text => ({ text, done: false }));
  }

  const [morningTasks, setMorningTasks] = useState(
    () => getInitialTasks(morningKey, dailyTasksList[today].morning)
  );
  const [eveningTasks, setEveningTasks] = useState(
    () => getInitialTasks(eveningKey, dailyTasksList[today].evening)
  );

 
  useEffect(() => {
    localStorage.setItem(morningKey, JSON.stringify(morningTasks));
  }, [morningTasks, morningKey]);
  useEffect(() => {
    localStorage.setItem(eveningKey, JSON.stringify(eveningTasks));
  }, [eveningTasks, eveningKey]);

  const toggleMorningTask = (idx) => {
    setMorningTasks(tasks =>
      tasks.map((task, i) =>
        i === idx ? { ...task, done: !task.done } : task
      )
    );
  };
  const toggleEveningTask = (idx) => {
    setEveningTasks(tasks =>
      tasks.map((task, i) =>
        i === idx ? { ...task, done: !task.done } : task
      )
    );
  };

  const totalTasks = morningTasks.length + eveningTasks.length;
  const completedTasks =
    morningTasks.filter(t => t.done).length +
    eveningTasks.filter(t => t.done).length;
  const progressPercent = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="max-w-6xl mx-auto mt-10 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 bg-white rounded-xl shadow-lg p-8 flex flex-col justify-center">
          <img
            src="https://i.pinimg.com/736x/34/10/18/341018976fc496dbc0fe38f31b4e3ce4.jpg"
            alt="Фитнес"
            className="w-full rounded-lg object-cover mb-6 shadow-md"
            style={{ maxHeight: 320 }}
          />
          <h2 className="text-3xl font-bold mb-4 text-purple-700">Қош келдіңіз!</h2>
          <p className="text-gray-700 mb-4">
            Бұл сіздің жеке фитнес платформаңыз. Жаттығу жасап, дұрыс тамақтаныңыз және жетістіктерге жетіңіз!
          </p>
          <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded mb-4">
            <span className="font-semibold text-purple-700">Мотивация:</span> {quote}
          </div>
          <ul className="list-disc pl-5 text-gray-600 text-sm">
            <li>Күніне 2 литр су ішу</li>
            <li>Күніне 8000 қадам</li>
          </ul>
        </div>
        <div className="flex-1 flex flex-col gap-8">
          <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center w-full">
            <h3 className="font-semibold mb-6 text-purple-700 text-xl flex items-center gap-2">
               Күнделікті тапсырмалар
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              <div>
                <h4 className="text-lg font-bold text-purple-600 mb-2 text-center">Таңғы тапсырмалар</h4>
                <ul>
                  {morningTasks.map((task, idx) => (
                    <li key={idx} className="mb-2 flex items-center">
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => toggleMorningTask(idx)}
                        className="mr-2 accent-purple-600"
                      />
                      <span className={task.done ? "line-through text-gray-400" : ""}>
                        {task.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold text-purple-600 mb-2 text-center">Кешкі тапсырмалар</h4>
                <ul>
                  {eveningTasks.map((task, idx) => (
                    <li key={idx} className="mb-2 flex items-center">
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => toggleEveningTask(idx)}
                        className="mr-2 accent-purple-600"
                      />
                      <span className={task.done ? "line-through text-gray-400" : ""}>
                        {task.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-xl shadow p-6 flex flex-col items-center justify-center w-full">
            <h3 className="font-semibold mb-3 text-purple-700 flex items-center gap-2">
              <span>💡</span> Кеңес
            </h3>
            <span className="text-md text-purple-800">{tip}</span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center w-full">
            <h3 className="font-semibold mb-3 text-purple-700 flex items-center gap-2">
               Күндік прогресс
            </h3>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div
                className="bg-purple-600 h-4 rounded-full"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-600">{completedTasks}/{totalTasks} тапсырма орындалды</span>
          </div>
        </div>
      </div>
    </div>
  );
}






function Workouts() {
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState(null);

  const workouts = [
    {
      id: 1,
      title: "Қолға жаттығу",
      image: "https://i.pinimg.com/736x/38/91/30/389130b0ccdaa163684954474aa87a02.jpg",
      description: "Қол бұлшықеттерін дамытатын жаттығулар.",
      video: "https://www.youtube.com/embed/ykJmrZ5v0Oo",
      exercises: [
        "Гантельмен бүгу",
        "Турникке тартылу",
        "Брусьяда көтерілу"
      ],
      gallery: ["/assets/arms1.jpg", "/assets/arms2.jpg"]
    },
    {
      id: 2,
      title: "Аяққа жаттығу",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb4CKTvfOCbXCTWt86EDI1Gm3Rd-2mrk7zMA&s",
      description: "Аяқ бұлшықеттерін дамытатын жаттығулар.",
      video: "https://www.youtube.com/embed/2tM1LFFxeKg",
      exercises: [
        "Приседания",
        "Выпады",
        "Плие приседания"
      ],
      gallery: ["/assets/legs1.jpg", "/assets/legs2.jpg"]
    },
    {
      id: 3,
      title: "Арқаға жаттығу",
      image: "https://health.fakty.com.ua/wp-content/uploads/sites/2/2022/11/30/depositphotos_468526734_s-e1669814454965.jpg",
      description: "Арқа бұлшықеттеріне арналған жаттығулар.",
      video: "https://www.youtube.com/embed/6e5hRLbCaCs",
      exercises: [
        "Турникке тартылу",
        "Гиперэкстензия",
        "Тяга гантели"
      ],
      gallery: ["/assets/back1.jpg", "/assets/back2.jpg"]
    },
    {
      id: 4,
      title: "Кеудеге жаттығу",
      image: "https://www.eto-sport.ru/upload/iblock/334/33407c887ef925ea51fffd84c8e87d78.jpg",
      description: "Кеуде бұлшықеттеріне арналған жаттығулар.",
      video: "https://www.youtube.com/embed/IODxDxX7oi4",
      exercises: [
        "Жатып гантель көтеру",
        "Отжимания",
        "Брусьяда көтерілу"
      ],
      gallery: ["/assets/chest1.jpg", "/assets/chest2.jpg"]
    },
    {
      id: 5,
      title: "Пресс жаттығулары",
      image: "https://img.championat.com/s/732x488/news/big/r/a/15-minut-dlya-idealnogo-pressa_16661686931580202283.jpg",
      description: "Қарын бұлшықеттеріне арналған жаттығулар.",
      video: "https://www.youtube.com/embed/1919eTCoESo",
      exercises: [
        "Планка",
        "Кранч",
        "Велосипед"
      ],
      gallery: ["/assets/abs1.jpg", "/assets/abs2.jpg"]
    },
    {
      id: 6,
      title: "Кардио жаттығулар",
      image: "https://img.championat.com/news/big/g/g/kak-podgotovit-telo-k-prazdnikam_16406829701131351896.jpg",
      description: "Жүрек пен төзімділікке арналған жаттығулар.",
      video: "https://www.youtube.com/embed/ml6cT4AZdqI",
      exercises: [
        "Жүгіру",
        "Секіру",
        "HIIT"
      ],
      gallery: ["/assets/cardio1.jpg", "/assets/cardio2.jpg"]
    },
    {
      id: 7,
      title: "Йога",
      image: "https://www.goldsgym.ru/upload/iblock/02f/02f89d63e8774d7b5bbf4fe3ae27bb3e.jpg",
      description: "Дене мен жанға арналған жаттығулар.",
      video: "https://www.youtube.com/embed/v7AYKMP6rOE",
      exercises: [
        "Кобра позасы",
        "Тау позасы",
        "Күшік позасы"
      ],
      gallery: ["/assets/yoga1.jpg", "/assets/yoga2.jpg"]
    },
    {
      id: 8,
      title: "Созылу",
      image: "https://img.freepik.com/premium-photo/young-woman-doing-stretching-exercises-home-relaxation_112699-852.jpg",
      description: "Бұлшықеттерді созуға арналған жаттығулар.",
      video: "https://www.youtube.com/embed/JEbEwE6lP5E",
      exercises: [
        "Аяқ созу",
        "Қол созу",
        "Арқа созу"
      ],
      gallery: ["/assets/stretch1.jpg", "/assets/stretch2.jpg"]
    },
    {
      id: 9,
      title: "HIIT",
      image: "https://img.freepik.com/free-photo/fitness-young-woman-doing-lateral-lunges-home-her-hiit-training-muscular-woman-sporty-clothing-working-out-home_662251-1395.jpg",
      description: "Жоғары интенсивті интервалды жаттығулар.",
      video: "https://www.youtube.com/embed/ml6cT4AZdqI",
      exercises: [
        "Бёрпи",
        "Секіріп отырып тұру",
        "Жылдам жүгіру"
      ],
      gallery: ["/assets/hiit1.jpg", "/assets/hiit2.jpg"]
    },
    {
      id: 10,
      title: "Плиометрика",
      image: "https://opis-cdn.tinkoffjournal.ru/mercury/plie-squat-in.dpqpswkcjnlq..jpg?preset=image_1280w_2x",
      description: "Жарылғыш күшке арналған жаттығулар.",
      video: "https://www.youtube.com/embed/3F2l2lzm2lA",
      exercises: [
        "Секіріп отырып тұру",
        "Қорапқа секіру",
        "Жылдам қадам"
      ],
      gallery: ["/assets/plyo1.jpg", "/assets/plyo2.jpg"]
    },
    {
      id: 11,
      title: "Баланс жаттығулары",
      image: "https://img.championat.com/i/r/w/1647015772585149362.jpg",
      description: "Дененің тепе-теңдігін дамытуға арналған жаттығулар.",
      video: "https://www.youtube.com/embed/8BcPHWGQO44",
      exercises: [
        "Бір аяқта тұру",
        "Баланс тақтасы",
        "Йога позалары"
      ],
      gallery: ["/assets/balance1.jpg", "/assets/balance2.jpg"]
    },
    {
      id: 12,
      title: "Күш жаттығулары",
      image: "https://www.restart-fitness.ru/uploads/gl/g900/thumb.jpg?v=1715777442",
      description: "Бұлшықет күшін арттыруға арналған жаттығулар.",
      video: "https://www.youtube.com/embed/U0bhE67HuDY",
      exercises: [
        "Гантель көтеру",
        "Штанга көтеру",
        "Турник"
      ],
      gallery: ["/assets/strength1.jpg", "/assets/strength2.jpg"]
    },
    {
      id: 13,
      title: "Тыныс алу жаттығулары",
      image: "https://static.tildacdn.com/tild3563-6666-4661-b736-363265323930/_6_1.jpg",
      description: "Дұрыс тыныс алуға арналған жаттығулар.",
      video: "https://www.youtube.com/embed/SEfs5TJZ6Nk",
      exercises: [
        "Терең тыныс алу",
        "4-7-8 әдісі",
        "Қарынмен тыныс алу"
      ],
      gallery: ["/assets/breath1.jpg", "/assets/breath2.jpg"]
    },
    {
      id: 14,
      title: "Жүгіру",
      image: "https://prosports.kz/storage/images/202304/253071_149e01a54fd36c2d51d0a00d46e9cc81.jpg",
      description: "Жүгіру техникасы мен жаттығулары.",
      video: "https://www.youtube.com/embed/5WjTnEq1gYQ",
      exercises: [
        "Жеңіл жүгіру",
        "Интервалды жүгіру",
        "Төбеге жүгіру"
      ],
      gallery: ["/assets/run1.jpg", "/assets/run2.jpg"]
    },
    {
      id: 15,
      title: "Велосипед",
      image: "https://sportishka.com/uploads/posts/2022-11/1667552995_1-sportishka-com-p-uprazhnenie-velosiped-dlya-pressa-oboi-1.jpg",
      description: "Велосипедпен жаттығу.",
      video: "https://www.youtube.com/embed/1VtBqGzGg6A",
      exercises: [
        "Түзу жолда жүру",
        "Тауға шығу",
        "Интервалды велосипед"
      ],
      gallery: ["/assets/bike1.jpg", "/assets/bike2.jpg"]
    },
    {
      id: 16,
      title: "Плие жаттығулары",
      image: "https://kotsport.ru/wp-content/uploads/2023/12/glubokoe-plie-1.webp",
      description: "Плие техникасы мен жаттығулары.",
      video: "https://www.youtube.com/embed/4kLr7r6hKpA",
      exercises: [
        "Плие приседания",
        "Плие секіру",
        "Плие балет"
      ],
      gallery: ["/assets/plie1.jpg", "/assets/plie2.jpg"]
    },
    {
      id: 17,
      title: "Табанға жаттығу",
      image: "https://static.ernur.kz/article/66ab97d113ce0.jfif",
      description: "Табан бұлшықеттеріне арналған жаттығулар.",
      video: "https://www.youtube.com/embed/1qg3l4kF9lA",
      exercises: [
        "Табанға созылу",
        "Табанға массаж",
        "Табанға күш жаттығулары"
      ],
      gallery: ["/assets/foot1.jpg", "/assets/foot2.jpg"]
    },
    {
      id: 18,
      title: "Бүкіл денеге жаттығу",
      image: "https://fitstars.ru/storage/app/media/uploaded-files/2021-06-20-009-1.jpg",
      description: "Бүкіл денеге арналған жаттығулар.",
      video: "https://www.youtube.com/embed/UBMk30rjy0o",
      exercises: [
        "Бёрпи",
        "Планка",
        "Жүгіру орнында"
      ],
      gallery: ["/assets/fullbody1.jpg", "/assets/fullbody2.jpg"]
    },
    {
      id: 19,
      title: "Тынығу және релакс",
      image: "https://img.freepik.com/free-photo/relax-training_1098-22199.jpg?t=st=1746804035~exp=1746807635~hmac=89fc5128f1161450d2003a4e0dd5268c2b6207dc526ab8a7aa5c7eabca9ac860",
      description: "Демалуға арналған жаттығулар.",
      video: "https://www.youtube.com/embed/1ZYbU82GVz4",
      exercises: [
        "Медитация",
        "Жеңіл созылу",
        "Тыныс алу"
      ],
      gallery: ["/assets/relax1.jpg", "/assets/relax2.jpg"]
    },
    {
      id: 20,
      title: "Балаларға арналған жаттығулар",
      image: "https://srednyadm.ru/media/resized/oEAwYRMyiGgNo3K-V-znkSTRAmDXekDeMupiKvSn_QA/rs:fit:1024:768/aHR0cHM6Ly9zcmVk/bnlhZG0ucnUvbWVk/aWEvcHJvamVjdF9t/b18zOTEvNmYvMDIv/YjgvYmIvODgvNjMv/aW1hZ2UwMDkuanBn.jpg",
      description: "Балаларға арналған қызықты жаттығулар.",
      video: "https://www.youtube.com/embed/oc4QS2USKmk",
      exercises: [
        "Секіру",
        "Орындыққа отыру",
        "Қолмен жүру"
      ],
      gallery: ["/assets/kids1.jpg", "/assets/kids2.jpg"]
    }
  ];

  const filtered = search
    ? workouts.filter(w =>
        w.title.toLowerCase().includes(search.toLowerCase())
      )
    : workouts;

  const openedWorkout = workouts.find(w => w.id === openId);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Жаттығулар</h2>
      <input
        type="text"
        className="border p-2 rounded mb-6 w-full max-w-md"
        placeholder="Жаттығу атауын іздеу..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((w) => (
          <div
            key={w.id}
            className="bg-white rounded-xl shadow-md p-4 cursor-pointer transition-all duration-300 flex flex-col items-center hover:scale-105"
            style={{
              minHeight: 140,
              minWidth: 260,
              maxWidth: 320,
              boxShadow: "0 2px 8px 0 rgba(80,80,120,0.08)"
            }}
            onClick={() => setOpenId(w.id)}
          >
            <img
              src={w.image}
              alt={w.title}
              className="w-40 h-28 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-bold text-purple-700 text-center">{w.title}</h3>
          </div>
        ))}
      </div>
      {openedWorkout && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(245,245,250,0.95)" }}
          onClick={() => setOpenId(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-8 relative flex flex-col items-center transition-all duration-300"
            style={{
              width: "95vw",
              maxWidth: 900,
              minHeight: 320,
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center"
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-purple-600 text-3xl"
              onClick={() => setOpenId(null)}
              aria-label="Жабу"
            >
              ×
            </button>
            <img
              src={openedWorkout.image}
              alt={openedWorkout.title}
              className="w-80 h-64 object-cover rounded-xl mr-8 hidden md:block"
            />
            <div className="flex-1 flex flex-col min-w-[250px]">
              <h3 className="text-2xl font-bold text-purple-700 mb-2">{openedWorkout.title}</h3>
              <p className="mb-2 text-base">{openedWorkout.description}</p>
              <ul className="list-disc pl-5 mb-2 text-base">
                {openedWorkout.exercises.map((ex, idx) => (
                  <li key={idx}>{ex}</li>
                ))}
              </ul>
              <div className="aspect-video w-full mt-2">
                <iframe
                  src={openedWorkout.video}
                  title={openedWorkout.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-48 rounded"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}






function Nutrition() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');

  let advice = '';
  let foods = [];
  let avoid = [];
  let goal = '';
  let normMin = 0;
  let normMax = 0;

  if (height && age) {
    const h = Number(height) / 100;
    if (Number(age) >= 18) {
      normMin = Math.round(18.5 * h * h);
      normMax = Math.round(24.9 * h * h);
    } else if (Number(age) >= 10 && Number(age) < 18) {
      normMin = Math.round(15 * h * h);
      normMax = Math.round(22 * h * h);
    } else if (Number(age) < 10) {
      normMin = Math.round(13 * h * h);
      normMax = Math.round(18 * h * h);
    }
  }

  if (weight && height && age) {
    const w = Number(weight);
    const h = Number(height) / 100;
    const bmi = w / (h * h);

    if (Number(age) >= 18) {
      if (bmi < 18.5) {
        advice = "Салмағыңыз төмен. Дәрігерге немесе диетологқа қаралыңыз!";
        goal = 'gain';
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        advice = "Салмағыңыз нормада!";
        goal = 'maintain';
      } else if (bmi > 24.9 && bmi <= 29.9) {
        advice = "Салмағыңыз артық. Салмақ тастау ұсынылады.";
        goal = 'lose';
      } else if (bmi > 29.9) {
        advice = "Семіздік! Міндетті түрде дәрігерге қаралыңыз!";
        goal = 'lose';
      }
    } else {
      if (w < normMin) {
        advice = "Салмағыңыз жас пен бойға шаққанда төмен. Дәрігерге немесе ата-анаңызға айтыңыз!";
        goal = 'gain';
      } else if (w > normMax) {
        advice = "Салмағыңыз жас пен бойға шаққанда жоғары. Дұрыс тамақтану және белсенділік керек!";
        goal = 'lose';
      } else {
        advice = "Салмағыңыз жас пен бойға шаққанда нормада!";
        goal = 'maintain';
      }
    }

    if (goal === 'gain') {
      foods = [
        "Күріш, макарон, нан, сұлы (көмірсу)",
        "Жаңғақ, авокадо, зәйтүн майы (майлар)",
        "Тауық еті, балық, жұмыртқа (ақуыз)",
        "Сүт өнімдері, ірімшік",
        "Көкөніс пен жеміс"
      ];
      avoid = [
        "Газдалған сусындар",
        "Тәттілерді шектен тыс жеу",
        "Фастфуд"
      ];
    } else if (goal === 'maintain') {
      foods = [
        "Көкөніс, жеміс",
        "Таза су",
        "Тауық еті, балық, жұмыртқа",
        "Күріш, қарақұмық, сұлы"
      ];
      avoid = [
        "Фастфуд",
        "Тәтті газдалған сусындар"
      ];
    } else if (goal === 'lose') {
      foods = [
        "Көкөніс, жасыл салат",
        "Тауық еті, балық (майсыз)",
        "Сұлы, қарақұмық",
        "Таза су"
      ];
      avoid = [
        "Тәттілер, кондитер өнімдері",
        "Фастфуд, қуырылған тағам",
        "Газдалған сусындар",
        "Майлы ет, шұжық"
      ];
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Салмақ, жас және бой калькуляторы</h2>
      <div className="flex flex-col gap-3 max-w-xs">
        <input
          type="number"
          className="border p-2 rounded w-48"
          placeholder="Салмағыңыз (кг)"
          value={weight}
          min={20}
          max={250}
          onChange={e => setWeight(e.target.value)}
        />
        <input
          type="number"
          className="border p-2 rounded w-48"
          placeholder="Бойыңыз (см)"
          value={height}
          min={80}
          max={250}
          onChange={e => setHeight(e.target.value)}
        />
        <input
          type="number"
          className="border p-2 rounded w-48"
          placeholder="Жасыңыз"
          value={age}
          min={3}
          max={120}
          onChange={e => setAge(e.target.value)}
        />
      </div>
      {height && age && (
        <div className="mt-2 text-sm text-gray-700">
          <span className="font-semibold">Сіздің жасыңыз бен бойыңызға норма салмақ: </span>
          {normMin} кг — {normMax} кг
        </div>
      )}
      {weight && height && age && (
        <div className="mt-4 bg-purple-50 rounded-xl p-4">
          <div className="font-semibold text-purple-700 mb-2">{advice}</div>
          {foods.length > 0 && (
            <div className="mb-2">
              <span className="font-bold text-green-700">Ұсынылатын тағамдар:</span>
              <ul className="list-disc pl-5">
                {foods.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          )}
          {avoid.length > 0 && (
            <div>
              <span className="font-bold text-red-700">Рационнан алып тастаңыз:</span>
              <ul className="list-disc pl-5">
                {avoid.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ChatAssistant() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Чат көмекшісі</h2>
      <p>Қандай көмек керек? Рационға қатысты және фитнес туралы сұрақтарға жауап беремін!</p>
      <textarea className="w-full mt-2 p-2 border rounded" rows="4" placeholder="Сұрағыңызды жазыңыз..." />
    </div>
  );
}

export default App;
