import { useState } from "react";
import { motion } from "framer-motion";
import Menu from "../../component/menu";
import HomeHeader from "../../component/homeheader";
import Coinimg from "../../assets/cm/coin.png";

import {
  CountUp,
  ProgressFill,
  cardMotion,
  staggerContainerVariants,
  staggerItemVariants,
} from "../../component/homeMotion.jsx";
import "./cm.css";

const topMetrics = [
  {
    label: "오늘의 소비",
    value: 28000,
    sub: "3월 30일",
    trend: "+12% ↑",
    suffix: "원",
  },
  {
    label: "4월의 소비 점수",
    value: 78,
    sub: "평균보다 안정적",
    trend: "",
    suffix: "점",
  },
  {
    label: "이번 주의 소비 속도",
    value: null,
    sub: "슬로우 소비",
    trend: "",
    text: "매우 좋음",
  },
  {
    label: "TOP 소비",
    value: null,
    sub: "3월 5주",
    trend: "+쇼핑/온라인 구독 ↑",
    text: "식비",
  },
];

const recentUsage = [
  {
    name: "GS25 녹번점",
    amount: "-5,600원",
    date: "3/26",
    hint: "평소보다 1,200원 적게 썼어요",
    piggyAmount: 1200,
  },
  {
    name: "백소정 관악점",
    amount: "-14,600원",
    date: "3/26",
    hint: "절약 가능 3,000원",
    piggyAmount: 3000,
  },
  { name: "교보문고 광화문점", amount: "-35,400원", date: "3/24" },
  { name: "롯데마트(주)", amount: "-10,600원", date: "3/22" },
  { name: "에이치앤엠", amount: "-34,020원", date: "3/20" },
];

const categoryItems = [
  { name: "식/외식", value: 60, color: "lime", reducible: 18000 },
  { name: "쇼핑", value: 30, color: "mint", reducible: 9000 },
  { name: "교통", value: 12, color: "lavender" },
];

const logBubbles = [
  { day: "26", label: "식사/외식", tone: "one" },
  { day: "27", label: "쇼핑", tone: "two" },
  { day: "28", label: "여행", tone: "three" },
  { day: "29", label: "취미", tone: "four" },
  { day: "30", label: "기타", tone: "five" },
];

export default function Cm() {
  const [cmToast, setCmToast] = useState(null);
  const [savedAmount, setSavedAmount] = useState(() => {
    const v = Number(localStorage.getItem("mony_saved_amount"));
    return v > 0 ? v : 326000;
  });
  const savingsGoal =
    Number(localStorage.getItem("mony_savings_goal")) || 500000;
  const savingsPct = Math.min(
    100,
    Math.round((savedAmount / savingsGoal) * 100),
  );

  const handlePiggyBank = (item) => {
    if (!item.piggyAmount) return;
    const next = savedAmount + item.piggyAmount;
    setSavedAmount(next);
    localStorage.setItem("mony_saved_amount", String(next));
    setCmToast(item.piggyAmount);
    setTimeout(() => setCmToast(null), 2500);
  };

  return (
    <main className="cm-page">
      <div className="cm-shell">
        <Menu />

        <section className="cm-main">
          <HomeHeader />
          <div className="cm-section">
            <motion.section
              className="cm-topMetrics"
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {topMetrics.map((metric) => (
                <motion.article
                  key={metric.label}
                  className="cm-topMetricCard"
                  variants={staggerItemVariants}
                  {...cardMotion}
                >
                  <div className="cm-topMetricHead">
                    <div>
                      <p>{metric.label}</p>
                      <strong>{metric.sub}</strong>
                    </div>
                    {metric.trend ? <span>{metric.trend}</span> : null}
                  </div>
                  <div className="cm-topMetricValue">
                    <h3>
                      {typeof metric.value === "number" ? (
                        <CountUp value={metric.value} suffix={metric.suffix} />
                      ) : (
                        metric.text
                      )}
                    </h3>
                  </div>
                </motion.article>
              ))}
            </motion.section>

            <motion.section
              className="cm-overview"
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.18 }}
            >
              <motion.article
                className="cm-card cm-card--challenge"
                variants={staggerItemVariants}
                {...cardMotion}
              >
                <div className="cm-challengeHead">
                  <p>4월 저축 챌린지</p>
                  <span aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M6.44669 16.3363L12.2104 10.48C12.3369 10.3523 12.4078 10.1798 12.4078 10C12.4078 9.82029 12.3369 9.64781 12.2104 9.52003L6.44794 3.66378C6.3216 3.53522 6.2508 3.36217 6.2508 3.18191C6.2508 3.00165 6.3216 2.8286 6.44794 2.70003C6.50966 2.63672 6.58343 2.58641 6.66491 2.55205C6.74638 2.5177 6.8339 2.5 6.92232 2.5C7.01074 2.5 7.09826 2.5177 7.17973 2.55205C7.2612 2.58641 7.33497 2.63672 7.39669 2.70003L13.1592 8.55503C13.5379 8.94069 13.75 9.45956 13.75 10C13.75 10.5405 13.5379 11.0594 13.1592 11.445L7.39669 17.3C7.33495 17.3635 7.26111 17.414 7.17952 17.4485C7.09793 17.483 7.01026 17.5007 6.92169 17.5007C6.83312 17.5007 6.74546 17.483 6.66387 17.4485C6.58228 17.414 6.50843 17.3635 6.44669 17.3C6.32035 17.1715 6.24955 16.9984 6.24955 16.8182C6.24955 16.6379 6.32035 16.4649 6.44669 16.3363Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                </div>
                <div className="cm-challengeAmounts">
                  <div>
                    <span>현재</span>
                    <strong className="is-lime">
                      <CountUp value={savedAmount} suffix="원" />
                    </strong>
                  </div>
                  <div>
                    <span>목표</span>
                    <strong>{savingsGoal.toLocaleString()}원</strong>
                  </div>
                </div>
                <div className="cm-challengeProgress">
                  <div className="cm-challengeBar">
                    <ProgressFill
                      value={savingsPct / 100}
                      className="cm-challengeFill"
                    />
                  </div>
                  <span className="cm-challengePct">{savingsPct}%</span>
                </div>
                <p className="cm-challengeRemain">
                  목표까지{" "}
                  <strong>
                    {(savingsGoal - savedAmount).toLocaleString()}원
                  </strong>{" "}
                  남았어요
                </p>
              </motion.article>

              <div className="cm-overviewRight">
                <motion.article
                  className="cm-card cm-summaryStrip"
                  variants={staggerItemVariants}
                  {...cardMotion}
                >
                  <div className="cm-summaryCell">
                    <span>가장 많이 사용한 카드</span>
                    <strong>김수한무의 카방카드</strong>
                  </div>
                  <div className="cm-summaryCell">
                    <span>이 카드는</span>
                    <strong>식비 중심으로 사용되고 있어요</strong>
                  </div>
                  <div className="cm-summaryCell">
                    <span>이번 달 쓴 돈</span>
                    <strong>-326,000원</strong>
                  </div>
                  <div className="cm-summaryCell">
                    <span>전체 소비</span>
                    <strong>약 42%</strong>
                  </div>
                  <div className="cm-summaryCell">
                    <span>지난 달에 비해</span>
                    <strong>12% ↑</strong>
                  </div>
                </motion.article>

                <div className="cm-grid3">
                  <motion.article
                    className="cm-card"
                    variants={staggerItemVariants}
                    {...cardMotion}
                  >
                    <h3 className="cm-cardTitle">최근 사용 내역</h3>
                    <div className="cm-list">
                      {recentUsage.map((item) => (
                        <div key={item.name} className="cm-listRow">
                          <div>
                            <strong>{item.name}</strong>
                            <span>{item.amount}</span>
                          </div>
                          <small>{item.date}</small>
                        </div>
                      ))}
                    </div>
                  </motion.article>

                  <motion.article
                    className="cm-card"
                    variants={staggerItemVariants}
                    {...cardMotion}
                  >
                    <h3 className="cm-cardTitle">카테고리 소비</h3>
                    <p className="cm-subtitle">소비 지출의 증감이 보이네요</p>
                    <div className="cm-categoryList">
                      {categoryItems.map((item) => (
                        <div key={item.name} className="cm-categoryItem">
                          <div className="cm-categoryTop">
                            <span
                              className={`cm-categoryIcon is-${item.color}`}
                            />
                            <strong>{item.name}</strong>
                            <small>{item.value}%</small>
                          </div>
                          <div className="cm-categoryBar">
                            <ProgressFill
                              value={item.value / 100}
                              className={`cm-categoryFill is-${item.color}`}
                            />
                          </div>
                          {item.reducible && (
                            <p className="cm-categoryReducible">
                              이번 달 줄일 수 있는 금액{" "}
                              {item.reducible.toLocaleString()}원
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.article>

                  <motion.article
                    className="cm-card cm-scoreCard"
                    variants={staggerItemVariants}
                    {...cardMotion}
                  >
                    <h3 className="cm-cardTitle">소비 성격</h3>
                    <p className="cm-scoreCopy">
                      최근 김수한무 님은
                      <br />
                      <strong>#소소하지만확실한행복</strong>을
                      <br />
                      소비하고 있어요
                    </p>
                    <p className="cm-scoreTags">#일상소비 #삶의질중시</p>
                    <div className="cm-scoreCharacter" aria-hidden="true">
                      ◎
                    </div>
                  </motion.article>
                </div>
              </div>
            </motion.section>

            <motion.section
              className="cm-bottomGrid"
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.18 }}
            >
              <motion.article
                className="cm-card cm-historyCard"
                variants={staggerItemVariants}
                {...cardMotion}
              >
                <div className="cm-cardHeaderLine">
                  <h3 className="cm-cardTitle">최근 사용 내역</h3>
                  <span>1 / 2</span>
                </div>

                <div className="cm-historyTop">
                  <div>
                    <span>카카오뱅크</span>
                    <strong>김수한무의 카방카드</strong>
                  </div>
                  <div>
                    <span>3월 사용금액</span>
                    <strong>326,000원</strong>
                  </div>
                  <div>
                    <span>국내 정상 (27건)</span>
                    <strong>326,000원</strong>
                  </div>
                </div>

                <div className="cm-historyList">
                  {recentUsage.map((item) =>
                    item.hint ? (
                      <div
                        key={`${item.name}-history`}
                        className="cm-historyRow cm-historyRow--rich"
                      >
                        <div className="cm-historyMain">
                          <strong className="cm-historyName">
                            {item.name}
                          </strong>
                          <strong>{item.amount}</strong>
                        </div>
                        <div className="cm-historyFooter">
                          <span className="cm-historyHint">{item.hint}</span>
                          <button
                            type="button"
                            className="cm-piggyBtn"
                            onClick={() => handlePiggyBank(item)}
                          >
                            저금통에 넣기
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        key={`${item.name}-history`}
                        className="cm-historyRow"
                      >
                        <span className="cm-historyName">{item.name}</span>
                        <strong>{item.amount}</strong>
                      </div>
                    ),
                  )}
                </div>
                {cmToast !== null && (
                  <div
                    className="cm-piggyToast"
                    role="status"
                    aria-live="polite"
                  >
                    🪙 {cmToast.toLocaleString()}원이 저금통에 쌓였어요!
                  </div>
                )}
              </motion.article>

              <div className="cm-rightStack">
                <motion.article
                  className="cm-card cm-calendarCard"
                  variants={staggerItemVariants}
                  {...cardMotion}
                >
                  <div className="cm-cardHeaderLine">
                    <div>
                      <p className="cm-cardMeta">2026년 3월</p>
                      <h3 className="cm-cardTitle">오늘 · 3월 30일 (월)</h3>
                    </div>
                    <span aria-hidden="true">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M6.44669 16.3363L12.2104 10.48C12.3369 10.3523 12.4078 10.1798 12.4078 10C12.4078 9.82029 12.3369 9.64781 12.2104 9.52003L6.44794 3.66378C6.3216 3.53522 6.2508 3.36217 6.2508 3.18191C6.2508 3.00165 6.3216 2.8286 6.44794 2.70003C6.50966 2.63672 6.58343 2.58641 6.66491 2.55205C6.74638 2.5177 6.8339 2.5 6.92232 2.5C7.01074 2.5 7.09826 2.5177 7.17973 2.55205C7.2612 2.58641 7.33497 2.63672 7.39669 2.70003L13.1592 8.55503C13.5379 8.94069 13.75 9.45956 13.75 10C13.75 10.5405 13.5379 11.0594 13.1592 11.445L7.39669 17.3C7.33495 17.3635 7.26111 17.414 7.17952 17.4485C7.09793 17.483 7.01026 17.5007 6.92169 17.5007C6.83312 17.5007 6.74546 17.483 6.66387 17.4485C6.58228 17.414 6.50843 17.3635 6.44669 17.3C6.32035 17.1715 6.24955 16.9984 6.24955 16.8182C6.24955 16.6379 6.32035 16.4649 6.44669 16.3363Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </div>

                  <div className="cm-calendar">
                    {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                      <span key={day} className="cm-calendarDay">
                        {day}
                      </span>
                    ))}
                    {["29", "30", "31", "1", "2", "3", "4"].map(
                      (day, index) => (
                        <span
                          key={day}
                          className={`cm-calendarDate ${index === 1 ? "is-active" : ""}`}
                        >
                          {day}
                        </span>
                      ),
                    )}
                  </div>
                </motion.article>

                <motion.article
                  className="cm-card cm-logCard"
                  variants={staggerItemVariants}
                  {...cardMotion}
                >
                  <div className="cm-cardHeaderLine">
                    <div>
                      <p className="cm-cardMeta">소비로그 · 2026년 3월</p>
                      <h3 className="cm-cardTitle">식사/외식 중심 로그</h3>
                    </div>
                    <span aria-hidden="true" className="next">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M6.44669 16.3363L12.2104 10.48C12.3369 10.3523 12.4078 10.1798 12.4078 10C12.4078 9.82029 12.3369 9.64781 12.2104 9.52003L6.44794 3.66378C6.3216 3.53522 6.2508 3.36217 6.2508 3.18191C6.2508 3.00165 6.3216 2.8286 6.44794 2.70003C6.50966 2.63672 6.58343 2.58641 6.66491 2.55205C6.74638 2.5177 6.8339 2.5 6.92232 2.5C7.01074 2.5 7.09826 2.5177 7.17973 2.55205C7.2612 2.58641 7.33497 2.63672 7.39669 2.70003L13.1592 8.55503C13.5379 8.94069 13.75 9.45956 13.75 10C13.75 10.5405 13.5379 11.0594 13.1592 11.445L7.39669 17.3C7.33495 17.3635 7.26111 17.414 7.17952 17.4485C7.09793 17.483 7.01026 17.5007 6.92169 17.5007C6.83312 17.5007 6.74546 17.483 6.66387 17.4485C6.58228 17.414 6.50843 17.3635 6.44669 17.3C6.32035 17.1715 6.24955 16.9984 6.24955 16.8182C6.24955 16.6379 6.32035 16.4649 6.44669 16.3363Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </div>

                  <div className="cm-logFilters">
                    {["식사/외식", "쇼핑", "여행", "취미", "장소", "기타"].map(
                      (item, index) => (
                        <span
                          key={item}
                          className={index === 0 ? "is-active" : ""}
                        >
                          {item}
                        </span>
                      ),
                    )}
                  </div>

                  <div className="cm-logBubbles">
                    {logBubbles.map((item) => (
                      <div
                        key={item.day}
                        className={`cm-logBubble is-${item.tone}`}
                      >
                        <span>{item.day}</span>
                        <small>{item.label}</small>
                      </div>
                    ))}
                  </div>
                </motion.article>
              </div>
            </motion.section>
          </div>
        </section>
      </div>
    </main>
  );
}
