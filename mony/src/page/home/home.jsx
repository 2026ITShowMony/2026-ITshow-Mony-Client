import { motion } from "framer-motion";
import Menu from "../../component/menu";
import HomeHeader from "../../component/homeheader";
import "./home.css";
import {
  CountUp,
  ProgressFill,
  cardMotion,
  buttonMotion,
  staggerContainerVariants,
  staggerItemVariants,
  revealVariants,
} from "../../component/homeMotion.jsx";

const highlightCards = [
  {
    no: "01",
    title: "일상 속\n작은 즐거움",
    desc: "간편한 소비의 일면을 담아봤어요",
    tags: "#일상의 #리노 #한정감",
    tone: "stone",
  },
  {
    no: "02",
    title: "페스트\n패션과 쇼핑",
    desc: "충동 구매가 많아 보이네요",
    tags: "#유니크로 #세련미로 #나이스",
    tone: "blue",
  },
  {
    no: "03",
    title: "나를\n위한 소비",
    desc: "취미 소비가 전체를 차지해요",
    tags: "#부수지출 #불균형 #분석",
    tone: "green",
  },
  {
    no: "04",
    title: "벚꽃이 핀\n봄나들이",
    desc: "계절 맞춤 소비가 보이네요",
    tags: "#따뜻함 #보드라움 #한달",
    tone: "pink",
  },
];

const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
const weekDates = ["29", "30", "31", "1", "2", "3", "4"];
const recentItems = [
  {
    color: "lime",
    label: "저축",
    time: "오전 10:00",
    title: "국민은행에 방문해서 생활비 저축하기",
  },
  {
    color: "cyan",
    label: "지출",
    time: "오후 5:00",
    title: "필라테스 4월 정기 이용권 지출",
  },
  {
    color: "pink",
    label: "수입",
    time: "오후 4:30",
    title: "메가커피 기간제 아르바이트 3월 월급 받은 날",
  },
];

const quickEntries = [
  { icon: "$", label: "이번 달 쓴 돈", value: "-428,000원", note: "이번 달 지출을 정리했어요" },
  { icon: "B", label: "이번 달 모은 돈", value: "+124,000원", note: "고정 지출은 안정적이에요" },
  { icon: "⚡", label: "이번 달 목표", value: "김수한무의 카방카드", note: "목표 카드에 가까워지고 있어요" },
  { icon: "◔", label: "카테고리", value: "식비 31%", note: "식비 비중이 조금 높아요" },
];

export default function Home() {
  return (
    <main className="home-page">
      <div className="home-shell">
        <Menu />

        <section className="home-main">
          <HomeHeader />

          <motion.section
            className="home-hero"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
          >
            <motion.div className="home-heroIntro" variants={staggerItemVariants}>
              <div className="home-heroIndex">01</div>
              <h2 className="home-heroTitle">
                이번 주의 소비를 한 번
                <br />
                살펴볼까요?
              </h2>
              <p className="home-heroDesc">
                MONY와 함께한 4월의 1주차의 소비 기록으로 인사이트를 보여드려요
              </p>
              <motion.button
                className="home-heroButton"
                type="button"
                {...buttonMotion}
              >
                소비관리 더보기
                <span aria-hidden="true">↗</span>
              </motion.button>
            </motion.div>

            <motion.div
              className="home-heroCards"
              aria-label="주간 인사이트"
              variants={staggerContainerVariants}
            >
              {highlightCards.map((card) => (
                <motion.article
                  key={card.no}
                  className={`home-insightCard is-${card.tone}`}
                  variants={staggerItemVariants}
                  {...cardMotion}
                >
                  <div className="home-insightNo">{card.no}</div>
                  <h3 className="home-insightTitle">
                    {card.title.split("\n").map((line, index, lines) => (
                      <span key={`${card.no}-${line}-${index}`}>
                        {line}
                        {index < lines.length - 1 ? <br /> : null}
                      </span>
                    ))}
                  </h3>
                  <p className="home-insightDesc">{card.desc}</p>
                  <p className="home-insightTags">{card.tags}</p>
                </motion.article>
              ))}
            </motion.div>
          </motion.section>

          <motion.section
            className="home-metrics"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.22 }}
          >
            <motion.article className="home-metricCard" variants={staggerItemVariants} {...cardMotion}>
              <p className="home-metricLabel">4월의 소비 목표</p>
              <div className="home-metricRow">
                <h3>천천히 소비하기</h3>
                <strong>
                  <CountUp value={48} suffix="%" formatter={(n) => `${n}`} />
                </strong>
              </div>
              <div className="home-progress">
                <ProgressFill className="home-progressBar" value={0.48} />
              </div>
            </motion.article>

            <motion.article className="home-metricCard" variants={staggerItemVariants} {...cardMotion}>
              <p className="home-metricLabel">이번 달의 소비</p>
              <div className="home-metricRow">
                <h3>김수한무의 카방카드</h3>
                <strong>
                  <CountUp value={326000} suffix="원" />
                </strong>
              </div>
              <p className="home-muted">지난달 대비 소비 지출이 12% 증가했어요.</p>
            </motion.article>

            <motion.article
              className="home-metricCard home-metricCard--accent"
              variants={staggerItemVariants}
              {...cardMotion}
            >
              <p className="home-metricLabel">오늘의 소비</p>
              <div className="home-metricRow">
                <h3 className="home-metricInline">
                  총 <CountUp value={28000} suffix="원" /> / <CountUp value={100000} suffix="원" />
                </h3>
              </div>
              <p className="home-muted">하루 소비 목표 금액에 도달하지 않았어요</p>
              <div className="home-star" aria-hidden="true">
                ★
              </div>
            </motion.article>
          </motion.section>

          <motion.section
            className="home-sectionTitle"
            variants={revealVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            <h3>김수한무 님의 활발한 4월의 소비를 확인해보세요!</h3>
          </motion.section>

          <motion.section
            className="home-bottomGrid"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
          >
            <motion.article className="home-panelCard" variants={staggerItemVariants} {...cardMotion}>
              <p className="home-panelMeta">2026년 3월</p>
              <h3 className="home-panelTitle">오늘 · 3월 31일 (수)</h3>
              <div className="home-calendar">
                <div className="home-calendarHead">
                  {weekDays.map((day) => (
                    <span key={day}>{day}</span>
                  ))}
                </div>
                <div className="home-calendarDates">
                  {weekDates.map((date, index) => (
                    <span key={date} className={index === 3 ? "is-active" : ""}>
                      {date}
                    </span>
                  ))}
                </div>
              </div>

              <div className="home-historyList">
                {recentItems.map((item) => (
                  <div key={item.title} className={`home-historyRow is-${item.color}`}>
                    <span className="home-historyLabel">
                      {item.label}
                      <small>{item.time}</small>
                    </span>
                    <span className="home-historyTitle">{item.title}</span>
                  </div>
                ))}
              </div>
            </motion.article>

            <motion.article className="home-panelCard" variants={staggerItemVariants} {...cardMotion}>
              <p className="home-panelMeta">2026년 3월</p>
              <h3 className="home-panelTitle">최근 사용 내역</h3>

              <div className="home-summaryCard">
                <div className="home-summaryIcon">S</div>
                <div className="home-summaryText">
                  <span>이번 달 쓴 돈</span>
                  <strong>-428,000원</strong>
                </div>
                <div className="home-summaryText">
                  <span>이번 달 모은 돈</span>
                  <strong>+124,000원</strong>
                </div>
                <div className="home-summaryText">
                  <span>이번 달 지출 목표 지정 카드</span>
                  <strong>김수한무의 카방카드</strong>
                </div>
              </div>

              <div className="home-quickGrid">
                {quickEntries.map((entry) => (
                  <div key={entry.label} className="home-quickItem">
                    <div className="home-quickIcon">{entry.icon}</div>
                    <div className="home-quickText">
                      <span>{entry.label}</span>
                      <strong>{entry.value}</strong>
                      <small>{entry.note}</small>
                    </div>
                  </div>
                ))}
              </div>
            </motion.article>
          </motion.section>
        </section>
      </div>
    </main>
  );
}
