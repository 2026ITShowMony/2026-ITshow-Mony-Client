import { motion } from "framer-motion";
import Menu from "../../component/menu";
import HomeHeader from "../../component/homeheader";
import {
  CountUp,
  ProgressFill,
  cardMotion,
  revealVariants,
  staggerContainerVariants,
  staggerItemVariants,
} from "../../component/homeMotion.jsx";
import "./ca.css";

const weekBars = [
  { day: "일", value: 42, active: false },
  { day: "월", value: 78, active: true },
  { day: "화", value: 84, active: false },
  { day: "수", value: 90, active: false },
  { day: "목", value: 72, active: false },
  { day: "금", value: 55, active: false },
  { day: "토", value: 64, active: false },
];

const fixedItems = [
  { title: "고정지출", value: 256800, suffix: "원", meta: "12건" },
  { title: "변동지출", value: 171200, suffix: "원", meta: "6건" },
];

const monthlyItems = [
  { title: "월세", value: 500000, count: "1건" },
  { title: "구독", value: 29000, count: "3건" },
  { title: "식비", value: 180000, count: "4건" },
  { title: "쇼핑", value: 120000, count: "이외 4건" },
];

const tripCards = [
  { date: "2026. 2. 2 - 2. 28.", place: "일본 나고야", card: "고정카드", method: "Visa 체크카드" },
  { date: "2025. 8. 4 - 8. 6.", place: "대한민국 부산", card: "고정카드", method: "카카오뱅크" },
  { date: "2023. 4. 7 - 4. 13.", place: "대한민국 제주도", card: "고정카드", method: "체크카드" },
];

const tripThumbs = ["#d7b36f", "#c88f5e", "#8cb4d7", "#dfc07a", "#a97343", "#d1d4db"];

export default function Ca() {
  return (
    <main className="ca-page">
      <div className="ca-shell">
        <Menu />

        <section className="ca-main">
          <HomeHeader />

          <motion.section
            className="ca-analysisFrame"
            variants={revealVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="ca-toolbar">
              <span>월별 / 주별 지출</span>
              <span>카카오뱅크, 김수한무의 카방카드</span>
              <span aria-hidden="true">⌄</span>
            </div>

            <motion.div
              className="ca-gridTop"
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.article className="ca-card ca-card--weekly" variants={staggerItemVariants} {...cardMotion}>
                <div className="ca-cardHead">
                  <div>
                    <p>3월</p>
                    <strong>월 진행 대비 소비량</strong>
                  </div>
                  <span>시간 대비 소비 70%</span>
                </div>

                <div className="ca-progressPair">
                  <div className="ca-progressRow">
                    <span>시간</span>
                    <div className="ca-progressTrack">
                      <ProgressFill className="ca-progressFill is-orange" value={0.54} />
                    </div>
                    <strong>50%</strong>
                  </div>
                  <div className="ca-progressRow">
                    <span>지출</span>
                    <div className="ca-progressTrack">
                      <ProgressFill className="ca-progressFill is-lime" value={0.72} />
                    </div>
                    <strong>70%</strong>
                  </div>
                </div>

                <div className="ca-miniGrid">
                  <div className="ca-miniCard">
                    <span>주간 | 3/23(월) - 3/30(일)</span>
                    <strong>총 지출</strong>
                    <strong>₩28,000</strong>
                    <small>주변비례 +12%</small>
                  </div>
                  <div className="ca-miniCard">
                    <span>지난달 대비 누적 소비</span>
                    <strong>이번달 누적</strong>
                    <strong>₩428,000</strong>
                    <small>지난달 누적 ₩380,000</small>
                  </div>
                  <div className="ca-miniCard">
                    <span>안정적인 적정 소비</span>
                    <strong>3월,</strong>
                    <strong>소비 패턴의 균형이 유지가 적절해요</strong>
                  </div>
                  <div className="ca-miniCard">
                    <span>3월의 지출</span>
                    <strong>최다지출</strong>
                    <strong>₩125,000</strong>
                    <small>적정소비 주간 소비 비중↑</small>
                  </div>
                  <div className="ca-miniCard">
                    <span>이번 달 소비 속도</span>
                    <strong>예상지출</strong>
                    <strong>₩530,000</strong>
                    <small>예상 대비 적정한 지출량</small>
                  </div>
                </div>
              </motion.article>

              <motion.article className="ca-card ca-card--chart" variants={staggerItemVariants} {...cardMotion}>
                <div className="ca-cardHead">
                  <div>
                    <p>3월 사용금액</p>
                    <strong>
                      <CountUp value={326000} suffix="원" />
                    </strong>
                  </div>
                </div>

                <div className="ca-weekChart">
                  <div className="ca-weekScale">
                    <span>31</span>
                    <span />
                    <span />
                    <span>1</span>
                  </div>
                  <div className="ca-weekBars">
                    {weekBars.map((bar) => (
                      <div key={bar.day} className="ca-weekBarWrap">
                        <motion.div
                          className={`ca-weekBar ${bar.active ? "is-active" : ""}`}
                          initial={{ scaleY: 0.35, opacity: 0.5 }}
                          whileInView={{ scaleY: 1, opacity: 1 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                          style={{ height: `${bar.value}%` }}
                        />
                        <span>{bar.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            </motion.div>
          </motion.section>

          <motion.section
            className="ca-middleGrid"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
          >
            <motion.article className="ca-card ca-card--fixed" variants={staggerItemVariants} {...cardMotion}>
              <div className="ca-cardHead">
                <h3>고정 / 변동 지출</h3>
                <span aria-hidden="true">›</span>
              </div>

              <div className="ca-fixedSummary">
                {fixedItems.map((item) => (
                  <div key={item.title} className="ca-fixedRow">
                    <div>
                      <strong>{item.title}</strong>
                      <span>
                        <CountUp value={item.value} suffix={item.suffix} />
                      </span>
                    </div>
                    <small>{item.meta}</small>
                  </div>
                ))}
              </div>

              <div className="ca-fixedGrid">
                {monthlyItems.map((item) => (
                  <div key={item.title} className="ca-fixedCard">
                    <div className="ca-fixedCardTop">
                      <strong>{item.title}</strong>
                      <span>
                        <CountUp value={item.value} suffix="원" />
                      </span>
                    </div>
                    <div className="ca-fixedCardFoot">
                      <small>{item.count}</small>
                      <span>고정카드/계좌</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.article>

            <motion.article className="ca-card ca-card--travel" variants={staggerItemVariants} {...cardMotion}>
              <div className="ca-cardHead">
                <div>
                  <h3>지출기록</h3>
                  <strong>지출 기록 · 여행</strong>
                </div>
                <span aria-hidden="true">›</span>
              </div>

              <div className="ca-tripCards">
                {tripCards.map((trip) => (
                  <div key={trip.place} className="ca-tripCard">
                    <span className="ca-tripMeta">여행 및 기타</span>
                    <strong>{trip.date}</strong>
                    <h4>{trip.place}</h4>
                    <p>
                      {trip.card}
                      <small>{trip.method}</small>
                    </p>
                  </div>
                ))}
              </div>

              <div className="ca-tripThumbs">
                {tripThumbs.map((color, index) => (
                  <div key={`${color}-${index}`} className="ca-tripThumb" style={{ background: color }}>
                    <span>{26 + index}</span>
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
