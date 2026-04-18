import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Menu from "../../component/menu";
import HomeHeader from "../../component/homeheader";
import {
  cardMotion,
  Reveal,
  staggerContainerVariants,
  staggerItemVariants,
} from "../../component/homeMotion";
import "./cc.css";

const quickCards = [
  {
    title: "이번 달 소비 분석",
    text: "지출 패턴, 많이 쓴 카테고리, 줄일 수 있는 항목을 알려줘",
  },
  {
    title: "지출 줄이는 방법",
    text: "생활비를 크게 바꾸지 않고 줄일 수 있는 현실적인 방법이 궁금해",
  },
  {
    title: "예산 재설정",
    text: "이번 달 남은 예산을 기준으로 다시 계획해줘",
  },
  {
    title: "나의 소비 습관",
    text: "내 소비 성향이 어떤지 요약해줘",
  },
  {
    title: "카드 사용 분석",
    text: "어떤 카드 지출이 많은지 카드별로 보여줘",
  },
  {
    title: "직접 물어보기",
    text: "지금 떠오르는 궁금한 점을 바로 질문할게",
  },
];

const promptPills = [
  "이번 달 소비 흐름",
  "식비 비중이 높은 이유",
  "지출 줄일 항목",
  "카테고리별 분석",
  "이번 주 예산",
  "고정비 점검",
];

const formatTime = (date = new Date()) =>
  date.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });

const buildAssistantReply = (input) => {
  const normalized = input.trim();
  if (!normalized) return "";

  if (normalized.includes("예산")) {
    return "예산 기준으로 보면, 이번 달은 식비와 소액 결제부터 먼저 점검하는 게 좋아요. 남은 기간에 맞춰 일일 허용 금액을 다시 나눠볼게요.";
  }

  if (normalized.includes("식비") || normalized.includes("외식")) {
    return "식비는 가변 폭이 큰 편이라, 평일과 주말을 나눠서 한도를 다르게 두면 관리가 쉬워요. 외식 빈도만 한 번 줄여도 체감이 큽니다.";
  }

  if (normalized.includes("카드")) {
    return "카드 사용은 결제 수단보다 카테고리 패턴을 먼저 보는 게 좋아요. 반복 결제와 비정기 결제를 분리해서 보면 줄일 포인트가 보입니다.";
  }

  if (normalized.includes("줄") || normalized.includes("절약")) {
    return "가장 부담이 적은 방법부터 보면, 구독 정리와 충동성 소액 결제를 먼저 손보는 게 효과적이에요. 생활 패턴을 크게 바꾸지 않아도 됩니다.";
  }

  return "좋아요. 지금 질문한 내용을 기준으로 소비 패턴과 남은 예산을 함께 보면서, 바로 실행할 수 있는 기준으로 정리해드릴게요.";
};

export default function CC() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "assistant-1",
      role: "assistant",
      text: "김수한무님, 지금 소비 흐름을 보면 식비와 소액 결제가 조금 눈에 띄어요. 궁금한 점을 편하게 물어보세요.",
      time: formatTime(),
    },
  ]);
  const chatEndRef = useRef(null);

  const greeting = useMemo(
    () => [
      "이번 달 소비 분석",
      "지출 줄이는 방법",
      "예산 재설정",
      "카드 사용 분석",
    ],
    [],
  );

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const sendMessage = (text) => {
    const content = text.trim();
    if (!content) return;

    const now = formatTime();
    const assistantReply = buildAssistantReply(content);

    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        role: "user",
        text: content,
        time: now,
      },
      {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: assistantReply,
        time: now,
      },
    ]);
    setMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(message);
  };

  const applyQuickReply = (text) => {
    setMessage(text);
    sendMessage(text);
  };

  return (
    <div className="cc-page">
      <div className="cc-shell">
        <Menu />

        <main className="cc-main">
          <HomeHeader />

          <Reveal className="cc-topStrip" as="section" amount={0.2}>
            <div className="cc-topIntro">
              <p className="cc-topEyebrow">오늘의 코칭</p>
              <h2 className="cc-topTitle">
                최근 식비 지출이 증가하고 있어요.
                <br />
                이번 주는 외식 횟수를 줄여보는 건 어떨까요?
              </h2>
            </div>

            <div className="cc-topCards">
              {[
                {
                  label: "소비 흐름",
                  value: "3일은 지출이 증가하는 추세예요",
                  meta: "12% 증가",
                },
                {
                  label: "주의 필요",
                  value: "쇼핑 지출이 늘고 있어요",
                  meta: "시간 대비 빠른 지출 속도",
                },
                {
                  label: "지출 패턴 안정",
                  value: "교통비 지출은 안정적이에요",
                  meta: "3주간 유지되는 교통비 지출",
                },
              ].map((item) => (
                <motion.article
                  key={item.label}
                  className="cc-miniCard"
                  {...cardMotion}
                  variants={staggerItemVariants}
                >
                  <span className="cc-miniLabel">{item.label}</span>
                  <strong className="cc-miniValue">{item.value}</strong>
                  <span className="cc-miniMeta">{item.meta}</span>
                </motion.article>
              ))}
              <div className="cc-avatarWrap" aria-hidden="true">
                <div className="cc-avatarBubble">코치</div>
                <div className="cc-avatarFace">🧸</div>
              </div>
            </div>
          </Reveal>

          <motion.section
            className="cc-board"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
          >
            <div className="cc-heroArea">
              <motion.div className="cc-heroCopy" variants={staggerItemVariants}>
                <p className="cc-heroEyebrow">김수한무님의 소비 관리에 있어서</p>
                <h2 className="cc-heroTitle">
                  MONY의 소비코치가
                  <br />
                  더 나은 선택으로 도와드릴게요
                </h2>
              </motion.div>

              <motion.div className="cc-promptGrid" variants={staggerContainerVariants}>
                {quickCards.map((card) => (
                  <motion.button
                    key={card.title}
                    type="button"
                    className="cc-promptCard"
                    onClick={() => applyQuickReply(card.text)}
                    variants={staggerItemVariants}
                    {...cardMotion}
                  >
                    <span className="cc-promptTitle">{card.title}</span>
                    <span className="cc-promptText">{card.text}</span>
                  </motion.button>
                ))}
              </motion.div>

              <div className="cc-promptPills" aria-label="추천 질문">
                {greeting.map((text) => (
                  <button
                    key={text}
                    type="button"
                    className="cc-promptPill"
                    onClick={() => applyQuickReply(text)}
                  >
                    {text}
                  </button>
                ))}
              </div>
            </div>

            <div className="cc-chatPanel">
              <div className="cc-chatHeader">
                <div>
                  <p className="cc-chatLabel">대화하기</p>
                  <h3 className="cc-chatTitle">궁금한 소비 이야기를 바로 물어보세요</h3>
                </div>
                <div className="cc-chatBadge">실시간 코칭</div>
              </div>

              <div className="cc-chatMessages" role="log" aria-live="polite">
                {messages.map((item) => (
                  <div
                    key={item.id}
                    className={`cc-chatBubble ${item.role === "user" ? "is-user" : "is-assistant"}`}
                  >
                    <span className="cc-chatRole">{item.role === "user" ? "나" : "코치"}</span>
                    <p>{item.text}</p>
                    <span className="cc-chatTime">{item.time}</span>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              <form className="cc-chatForm" onSubmit={handleSubmit}>
                <div className="cc-chatInputWrap">
                  <input
                    type="text"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="무엇이든 물어보세요"
                    className="cc-chatInput"
                  />
                  <button type="submit" className="cc-sendButton">
                    전송
                  </button>
                </div>
                <div className="cc-inputHint">
                  Enter로 전송할 수 있고, 추천 질문을 눌러도 바로 채팅이 시작됩니다.
                </div>
              </form>
            </div>
          </motion.section>
        </main>
      </div>
    </div>
  );
}
