import { motion } from "framer-motion";
import Menu from "../../component/menu";
import HomeHeader from "../../component/homeheader";
import Banner from "../../component/banner";
import profile from "../../assets/home/homeprofile.png";
import Char from "../../assets/home/char.svg";
import Logo from "../../assets/menu/Logo.svg";
import Economy from "../../assets/home/economy.svg";
import Young from "../../assets/home/young.svg";
import HomeIcon from "../../assets/home/home.svg";
import Dog from "../../assets/home/dog.svg";
import Cancer from "../../assets/home/cancer.svg";
import Health from "../../assets/home/health.svg";
import Apartment from "../../assets/home/apartement.svg";
import Database from "../../assets/home/database.svg";
import Policy from "../../assets/home/policy.svg";
import Refresh from "../../assets/home/formkit_refresh.svg";

import "./home.css";
import {
  CountUp,
  ProgressFill,
  cardMotion,
  staggerContainerVariants,
  staggerItemVariants,
  revealVariants,
} from "../../component/homeMotion.jsx";

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

const benefitRows = [
  {
    amount: "2,100원",
    period: "3-4월의 혜택",
    cardName: "현대 제로 카드",
    pointTitle: "포인트 적립",
    pointValue: "2,100원",
    discountTitle: "누적 결제 할인 혜택",
    discountValue: "100원",
  },
  {
    amount: "17원",
    period: "3-4월의 혜택",
    cardName: "카카오페이머니",
    pointTitle: "포인트 적립",
    pointValue: "17원",
    discountTitle: "누적 결제 할인 혜택",
    discountValue: "0원",
  },
];

const talkGroups = [
  {
    key: "youth",
    title: "청년&생활",
    items: [
      { icon: Economy, label: "취업역량강화", title: "경기청년 갚이여" },
      { icon: Young, label: "법정공휴일", title: "5월 1일은 공휴일" },
      { icon: HomeIcon, label: "봄나들이", title: "숙박세일 페스타" },
    ],
  },
  {
    key: "insurance",
    title: "보험",
    items: [
      { icon: Dog, label: "반려보험", title: "강아지 보험을 점검해요" },
      { icon: Cancer, label: "건강보험", title: "보장 항목을 다시 살펴봐요" },
      { icon: Health, label: "실손보험", title: "병원비 부담을 줄여요" },
    ],
  },
  {
    key: "realestate",
    title: "부동산",
    items: [
      { icon: Apartment, label: "전세/월세", title: "보증금과 대출을 비교해요" },
      { icon: Database, label: "청약", title: "분양 일정과 조건을 확인해요" },
      { icon: Policy, label: "정책", title: "지원 정책을 먼저 체크해요" },
    ],
  },
];

const activeTalkGroup = talkGroups[0];

const currentMonthLabel = "2026년 3월";
const todayLabel = getTodayLabel(new Date("2026-03-31T00:00:00"));

function getTodayLabel(date = new Date()) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = weekDays[date.getDay()];

  return `오늘 · ${month}월 ${day}일 (${weekday})`;
}

export default function Home() {
  return (
    <main className="home-page">
      <div className="home-shell">
        <Menu />

        <section className="home-main">
          <HomeHeader />
          <Banner />

          <motion.section
            className="home-metrics"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.22 }}
          >
            <motion.article
              className="home-metricCard home-metricCard--goal"
              variants={staggerItemVariants}
              {...cardMotion}
            >
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

            <motion.article
              className="home-metricCard home-metricCard--spending"
              variants={staggerItemVariants}
              {...cardMotion}
            >
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
              className="home-metricCard home-metricCard--accent home-metricCard--today"
              variants={staggerItemVariants}
              {...cardMotion}
            >
              <div className="home-todayContent">
                <p className="home-metricLabel">오늘의 소비</p>
                <div className="home-metricRow">
                  <h3 className="home-metricInline">
                    총 <CountUp value={28000} suffix="원" /> / <CountUp value={100000} suffix="원" />
                  </h3>
                </div>
                <p className="home-muted">하루 소비 목표 금액에 도달하지 않았어요</p>
              </div>
              <img className="home-profileImage" src={profile} alt="" aria-hidden="true" />
            </motion.article>
          </motion.section>

          <motion.section
            className="home-sectionTitle"
            variants={revealVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            <h3>김수한무 님의 활발한 4월의 소비를 확인해보세요! 🍃</h3>
          </motion.section>

          <motion.section
            className="home-bottomGrid"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
          >
            <motion.article className="home-panelCard" variants={staggerItemVariants} {...cardMotion}>
              <p className="home-panelMeta">{currentMonthLabel}</p>
              <h3 className="home-panelTitle">{todayLabel}</h3>

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
              <p className="home-panelMeta">{currentMonthLabel}</p>
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
          <motion.section
            className="home-bottomFeature"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
          >
            <motion.h3 className="home-bottomFeatureTitle" variants={staggerItemVariants}>
              김수한무 님만을 위한 소비 이야기를 발견해보세요 ⭐
            </motion.h3>

            <div className="home-bottomFeatureGrid">
              <motion.article className="home-featureCard home-featureCard--benefit" variants={staggerItemVariants} {...cardMotion}>
                <div className="home-featureHeader">
                  <div>
                    <p className="home-featureLabel">결제 수단 혜택</p>
                    <h4 className="home-featureTitle">현대카드</h4>
                  </div>
                  <img className="home-featureAvatar" src={profile} alt="" aria-hidden="true" />
                </div>

                <div className="home-benefitList">
                  {benefitRows.map((row) => (
                    <div key={row.cardName} className="home-benefitRow">
                      <div className="home-benefitMain">
                        <strong>{row.amount}</strong>
                        <span>{row.period}</span>
                      </div>

                      <div className="home-benefitCardName">
                        <span>결제 혜택 지정 카드</span>
                        <strong>{row.cardName}</strong>
                      </div>

                      <div className="home-benefitMeta">
                        <div>
                          <span>{row.pointTitle}</span>
                          <strong>{row.pointValue}</strong>
                        </div>
                        <div>
                          <span>{row.discountTitle}</span>
                          <strong>{row.discountValue}</strong>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.article>

              <motion.article className="home-featureCard home-featureCard--talk" variants={staggerItemVariants} {...cardMotion}>
                <div className="home-featureHeader">
                  <div>
                    <p className="home-featureLabel">모니 TALK</p>
                    <h4 className="home-featureTitle is-lime">{activeTalkGroup.title}</h4>
                  </div>
                  <button type="button" className="home-featureRefresh" aria-label="새로고침">
                    <img src={Refresh} alt="" aria-hidden="true" />
                  </button>
                </div>

                <div className="home-talkList">
                  {activeTalkGroup.items.map((item) => (
                    <button key={item.title} type="button" className="home-talkItem">
                      <img className="home-talkIconImage" src={item.icon} alt="" aria-hidden="true" />
                      <span className="home-talkText">
                        <small>{item.label}</small>
                        <strong>{item.title}</strong>
                      </span>
                    </button>
                  ))}
                </div>
              </motion.article>

              <motion.article className="home-featureCard home-featureCard--budget" variants={staggerItemVariants} {...cardMotion}>
                <p className="home-featureLabel">예산목표를 설정해볼까요?</p>
                <div className="home-budgetBubble">
                  <span>모니와 함께</span>
                  <strong>슬로우 소비를</strong>
                  <strong>실천해요!</strong>
                </div>
                <img className="home-budgetAvatar" src={profile} alt="" aria-hidden="true" />
              </motion.article>
            </div>
          </motion.section>
          <div className="footer">
            <p>소비에 더 나은 이유를,</p>
            <img className="footerLogo" src={Logo} alt="Mony" />
          </div>
        </section>
        
      </div>
    </main>
  );
}
