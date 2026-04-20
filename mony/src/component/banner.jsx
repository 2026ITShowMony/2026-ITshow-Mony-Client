import { motion } from "framer-motion";
import { cardMotion, buttonMotion, staggerContainerVariants, staggerItemVariants } from "./homeMotion.jsx";
import "./banner.css";

const highlightCards = [
  {
    no: "01",
    title: "일상 속\n작은 즐거움",
    desc: "간편한 소비의 선택이 증가했어요",
    tags: "#편의점 #다이소 #정기구독",
    tone: "stone",
  },
  {
    no: "02",
    title: "페스트\n패션과 쇼핑",
    desc: "충동 구매가 구매 가능성이 보여요",
    tags: "#유니클로 #캔메이크 #나이키",
    tone: "blue",
  },
  {
    no: "03",
    title: "나를\n위한 소비",
    desc: "취미 소비가 최근 활발해 졌어요",
    tags: "#수제공방 #클래스101 #독서",
    tone: "green",
  },
  {
    no: "04",
    title: "벚꽃이 핀\n봄나들이",
    desc: "야외 활동이 소비를 선호하시는 군요",
    tags: "#따릉이 #노들섬 #한강",
    tone: "pink",
  },
];

export default function Banner() {
  return (
    <motion.section
      className="home-hero"
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
    >
      <motion.div className="home-heroIntro" variants={staggerItemVariants}>
        <div className="home-heroIndex">01</div>
        <p>활기찬 하루를 보내고 있는, 김수한무 님</p>
        <h2 className="home-heroTitle">
          이번 주의 소비를 한 번
          <br />
          살펴볼까요?
        </h2>
        <p className="home-heroDesc">
          MONY와 함께한 4월의 1주차의 소비 기록으로 인사이트를 보여드려요
        </p>
        <motion.button className="home-heroButton" type="button" {...buttonMotion}>
          소비관리 더보기
          <span aria-hidden="true">↗</span>
        </motion.button>
      </motion.div>

      <motion.div className="home-heroCards" aria-label="주간 인사이트" variants={staggerContainerVariants}>
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
  );
}
