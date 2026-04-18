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
import "./bg.css";

const goalStats = [
  { label: "3월 예산", value: 550000, suffix: "원" },
  { label: "3월 사용금액", value: 428000, suffix: "원", extra: "(78%)" },
  { label: "남은 예산 금액", value: 122000, suffix: "원" },
  { label: "평균 횟수", value: 62, suffix: "건" },
];

const monthlyCategories = [
  { name: "식비", used: 250000, budget: 180000, note: "초과 70,000원" },
  { name: "쇼핑", used: 116700, budget: 120000, note: "여유" },
];

const milestoneItems = [
  { title: "충동 구매 줄이기", progress: 0.23, period: "3월~", desc: "필요한 것만 사고 충동 구매는 줄일래요" },
  { title: "천천히 소비하기", progress: 0.48, period: "2월~", desc: "생각하면서 여유롭게 소비하고 싶어요" },
];

const challengeCards = [
  { title: "열심히 묵돈 만들기", amount: 15000, progress: 0.45 },
  { title: "태국 여행 자금 만들기", amount: 300000, progress: 0.08 },
  { title: "건강관리 비용 모으기", amount: 20000, progress: 0.12 },
];

export default function Bg() {
  return (
    <main className="bg-page">
      <div className="bg-shell">
        <Menu />

        <section className="bg-main">
          <HomeHeader />

          <motion.section
            className="bg-board"
            variants={revealVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              className="bg-gridTop"
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.article className="bg-card bg-card--budget" variants={staggerItemVariants} {...cardMotion}>
                <div className="bg-cardHead">
                  <h3>월간 예산</h3>
                  <span aria-hidden="true">›</span>
                </div>

                <div className="bg-budgetSummary">
                  {goalStats.map((item) => (
                    <div key={item.label} className="bg-budgetStat">
                      <span>{item.label}</span>
                      <strong>
                        <CountUp value={item.value} suffix={item.suffix} />
                        {item.extra ? <small>{item.extra}</small> : null}
                      </strong>
                    </div>
                  ))}
                </div>

                <div className="bg-budgetPanels">
                  <div className="bg-budgetPanel">
                    <div className="bg-budgetPanelHead">
                      <strong>카테고리 예산</strong>
                      <span>식비 250,000 / 180,000</span>
                    </div>
                    <div className="bg-budgetRows">
                      {monthlyCategories.map((item) => (
                        <div key={item.name} className="bg-budgetRow">
                          <div>
                            <strong>{item.name}</strong>
                            <span>
                              <CountUp value={item.used} suffix="원" /> / <CountUp value={item.budget} suffix="원" />
                            </span>
                          </div>
                          <small>{item.note}</small>
                        </div>
                      ))}
                    </div>
                    <p className="bg-budgetHint">
                      <strong>소비 지출의 35% 증가</strong>
                      외식 소비 증가
                    </p>
                  </div>

                  <div className="bg-budgetPanel bg-budgetPanel--progress">
                    <div className="bg-budgetPanelHead">
                      <strong>시간 진행률</strong>
                      <span>소비 진행률</span>
                    </div>
                    <div className="bg-progressHero">
                      <div className="bg-progressPercent">
                        <strong>50%</strong>
                        <p>시간 대비 소비 78%</p>
                      </div>
                      <div className="bg-progressStack">
                        <div className="bg-progressLine">
                          <span>시간</span>
                          <div className="bg-progressTrack">
                            <ProgressFill className="bg-progressFill is-orange" value={0.5} />
                          </div>
                          <strong>50%</strong>
                        </div>
                        <div className="bg-progressLine">
                          <span>소비</span>
                          <div className="bg-progressTrack">
                            <ProgressFill className="bg-progressFill is-lime" value={0.78} />
                          </div>
                          <strong>78%</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>

              <motion.article className="bg-card bg-card--goal" variants={staggerItemVariants} {...cardMotion}>
                <h3>이번달의 예산목표</h3>

                <div className="bg-goalHero">
                  <div className="bg-goalAvatar">🐻</div>
                  <div className="bg-goalHeroText">
                    <div className="bg-goalTag">진행중인 목표 1</div>
                    <p>필요한 것만 사고 충동 구매는 줄일래요</p>
                    <strong>충동 구매 줄이기</strong>
                    <div className="bg-goalMeta">
                      <span>진행률</span>
                      <strong>23%</strong>
                      <span>기간</span>
                      <strong>3월~</strong>
                    </div>
                  </div>
                </div>

                <div className="bg-goalList">
                  {milestoneItems.map((item, index) => (
                    <div key={item.title} className="bg-goalCard">
                      <span className="bg-goalTag">진행중인 목표 {index + 1}</span>
                      <p>{item.desc}</p>
                      <strong>{item.title}</strong>
                      <div className="bg-goalMeta">
                        <span>진행률</span>
                        <strong>{Math.round(item.progress * 100)}%</strong>
                        <span>기간</span>
                        <strong>{item.period}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.article>
            </motion.div>

            <motion.div
              className="bg-gridBottom"
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.18 }}
            >
              <motion.article className="bg-card bg-card--guide" variants={staggerItemVariants} {...cardMotion}>
                <div className="bg-cardHead">
                  <h3>예산 가이드</h3>
                  <span aria-hidden="true">›</span>
                </div>

                <div className="bg-guideGrid">
                  <div className="bg-guideSummary">
                    <div>
                      <strong>3월 30일 | 남은 기간 1일</strong>
                      <p>4월이 되기 전 예산을 정리해요</p>
                    </div>
                    <strong className="bg-guideAmount">
                      <CountUp value={122200} suffix="원" />
                    </strong>
                  </div>

                  <div className="bg-guidePlan">
                    <strong>예산 제안</strong>
                    <p>! 식비를 20% 줄이면 예산 내 유지 가능</p>
                    <p>! 쇼핑 지출을 절반으로 줄이면 안정</p>
                  </div>
                </div>
              </motion.article>

              <motion.article className="bg-card bg-card--challenge" variants={staggerItemVariants} {...cardMotion}>
                <div className="bg-cardHead">
                  <h3>버킷리스트 챌린지</h3>
                  <span aria-hidden="true">›</span>
                </div>

                <div className="bg-challengeGrid">
                  {challengeCards.map((item) => (
                    <div key={item.title} className="bg-challengeCard">
                      <strong>{item.title}</strong>
                      <span>버킷리스트 진행중</span>
                      <div className="bg-challengeAmount">
                        <CountUp value={item.amount} suffix="원" />
                      </div>
                      <div className="bg-challengeBar">
                        <ProgressFill className="bg-progressFill is-lime" value={item.progress} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.article>
            </motion.div>
          </motion.section>
        </section>
      </div>
    </main>
  );
}
