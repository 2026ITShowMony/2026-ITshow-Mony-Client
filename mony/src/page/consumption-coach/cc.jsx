import { useEffect, useRef, useState } from "react";
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
  { title: "이번 달 소비 분석",   text: "지출 패턴,소비 흐름" },
  { title: "지출 줄이는 방법",    text: "절약 방식 추천" },
  { title: "예산 맞추기",         text: "남은 금액 활용" },
  { title: "나의 소비 습관",      text: "소비 성향 분석" },
  { title: "카드 사용 분석",      text: "카드 지출" },
  { title: "저축 챌린지 조언",    text: "저축 목표 달성 방법" },
  { title: "저금통 현황 확인",    text: "저금통 현황" },
  { title: "직접 물어보기",       text: "궁금한 점을 질문하기" },
  { title: "저금통 얼마나 찼어?",          text: "저금통 달성률 확인",    savings: true },
  { title: "오늘 아낀 돈 넣기",            text: "절약 금액 바로 적립",   savings: true },
  { title: "이번 달 저축 가능 금액 보기",  text: "이번 달 절약 가능 금액", savings: true },
  { title: "목표 달성하려면 얼마나 아껴야 해?", text: "일일 절약 목표 계산", savings: true },
];

const miniCards = [
  {
    label: "소비 흐름",
    value: "3월은 지출이 증가하는 추세에요",
    meta: "12% 증가",
  },
  {
    label: "주의 필요",
    value: "쇼핑 지출이 증가 하고 있어요",
    meta: "시간 대비 빠른 지출 속도",
  },
  {
    label: "지출 패턴 안정",
    value: "교통비 지출이 안정적이에요",
    meta: "3주간 유지되는 교통비 지출",
  },
];

const formatTime = (date = new Date()) =>
  date.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });

const buildAssistantReply = (input) => {
  const t = input.trim();
  if (!t) return { type: "text", text: "" };

  if (
    t.includes("소비 분석") ||
    t.includes("지출 패턴") ||
    t.includes("소비 흐름") ||
    t.includes("이번 달 소비")
  ) {
    return {
      type: "insight",
      greeting:
        "반가워요! 김수한무님.\n요청하신 이번 달의 소비를 인사이트 형식으로 요약해보았어요.",
      title: "3월의 소비 요약",
      summary: "3월의 총 소비 비용은 428,000원이에요.",
      bullets: ["식비 12% 증가", "쇼핑 8% 감소", "전체 소비 +5%"],
      footer: "최근 김수한무님은 외식 비중의 소비가 증가하는 추세에요.",
    };
  }
  if (t.includes("절약") || t.includes("줄이는 방법") || t.includes("절약 방식 추천")) {
    return {
      type: "text",
      text: "가장 부담이 적은 방법부터 보면, 구독 정리와 충동성 소액 결제를 먼저 손보는 게 효과적이에요. 생활 패턴을 크게 바꾸지 않아도 됩니다.",
    };
  }
  if (t.includes("예산") || t.includes("남은 금액 활용")) {
    return {
      type: "text",
      text: "예산 기준으로 보면, 이번 달은 식비와 소액 결제부터 먼저 점검하는 게 좋아요. 남은 기간에 맞춰 일일 허용 금액을 다시 나눠볼게요.",
    };
  }
  if (t.includes("소비 성향") || t.includes("소비 습관")) {
    return {
      type: "text",
      text: "김수한무님의 소비 성향은 외식과 소액 결제에 집중되는 편이에요. 충동구매 비율이 낮고 고정비는 안정적으로 관리되고 있어요.",
    };
  }
  if (t.includes("카드")) {
    return {
      type: "text",
      text: "카드 사용은 결제 수단보다 카테고리 패턴을 먼저 보는 게 좋아요. 반복 결제와 비정기 결제를 분리해서 보면 줄일 포인트가 보입니다.",
    };
  }

  // ── 저금통 특정 응답 (generic 저축 catch 전에 먼저 확인) ──
  if (t.includes("저금통 달성률")) {
    const saved = Number(localStorage.getItem("mony_saved_amount")) || 326000;
    const goal  = Number(localStorage.getItem("mony_savings_goal"))  || 500000;
    const pct    = Math.min(100, Math.round((saved / goal) * 100));
    const remain = Math.max(0, goal - saved);
    return {
      type: "text",
      text: `이번 달 저축 저금통은 ${goal.toLocaleString()}원 중 ${saved.toLocaleString()}원이 채워졌어요. 현재 달성률은 ${pct}%이고, 목표까지 ${remain.toLocaleString()}원이 남았어요.`,
    };
  }
  if (t.includes("절약 금액 바로")) {
    return {
      type: "piggy",
      text: "오늘은 예상 소비보다 5,000원을 덜 썼어요. 이 금액을 저금통에 넣어볼까요?",
      amount: 5000,
    };
  }
  if (t.includes("이번 달 절약 가능")) {
    return {
      type: "text",
      text: "이번 달 조절 가능한 소비에서 약 42,000원을 더 아낄 수 있어요. 특히 카페와 식비에서 절약 가능성이 높아요.",
    };
  }
  if (t.includes("일일 절약")) {
    const saved  = Number(localStorage.getItem("mony_saved_amount")) || 326000;
    const goal   = Number(localStorage.getItem("mony_savings_goal"))  || 500000;
    const remain = Math.max(0, goal - saved);
    const daily  = Math.ceil(remain / 20);
    return {
      type: "text",
      text: `목표까지 ${remain.toLocaleString()}원이 남았어요. 남은 20일 동안 하루 약 ${daily.toLocaleString()}원씩 아끼면 목표를 달성할 수 있어요.`,
    };
  }

  if (
    t.includes("저축") ||
    t.includes("저금통") ||
    t.includes("챌린지") ||
    t.includes("저축 목표") ||
    t.includes("적립")
  ) {
    const saved  = Number(localStorage.getItem("mony_saved_amount") ?? 32000);
    const goal   = Number(localStorage.getItem("mony_savings_goal")  ?? 100000);
    const remain = Math.max(0, goal - saved);
    return {
      type: "text",
      text: `현재 저축 저금통에 ${saved.toLocaleString()}원이 적립되어 있어요. 목표 ${goal.toLocaleString()}원까지 ${remain.toLocaleString()}원이 남았어요. 이번 주 식비와 카페 지출을 조금 줄이면 목표에 더 빨리 도달할 수 있어요! 소비관리 화면에서 각 내역의 "저금통에 넣기" 버튼을 눌러 바로 적립해보세요.`,
    };
  }
  return {
    type: "text",
    text: "좋아요. 지금 질문한 내용을 기준으로 소비 패턴과 남은 예산을 함께 보면서, 바로 실행할 수 있는 기준으로 정리해드릴게요.",
  };
};

export default function CC() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [ccSaveToast, setCcSaveToast] = useState(null);
  const chatEndRef = useRef(null);
  const hasChatted = messages.length > 0;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const handleCcSave = (amount) => {
    const prev = Number(localStorage.getItem("mony_saved_amount") ?? 0);
    localStorage.setItem("mony_saved_amount", String(prev + amount));
    setCcSaveToast(amount);
    setTimeout(() => setCcSaveToast(null), 2500);
  };

  const sendMessage = (text) => {
    const content = text.trim();
    if (!content) return;
    const now = formatTime();
    const reply = buildAssistantReply(content);
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, role: "user", text: content, time: now },
      { id: `asst-${Date.now() + 1}`, role: "assistant", reply, time: now },
    ]);
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(message);
  };

  return (
    <div className="cc-page">
      <div className="cc-shell">
        <Menu />

        <main className="cc-main">
          <HomeHeader />

          {/* ── TOP STRIP ── */}
          <Reveal as="section" className="cc-topStrip" amount={0.2}>
            <div className="cc-topIntro">
              <p className="cc-topEyebrow">오늘의 코칭</p>
              <h2 className="cc-topTitle">
                최근 식비 지출이 증가하고 있어요.
                <br />
                이번 주는 외식 횟수를 줄여보는 건 어떨까요?
              </h2>
            </div>

            {miniCards.map((card) => (
              <motion.article
                key={card.label}
                className="cc-miniCard"
                {...cardMotion}
              >
                <span className="cc-miniLabel">{card.label}</span>
                <strong className="cc-miniValue">{card.value}</strong>
                <span className="cc-miniMeta">{card.meta}</span>
              </motion.article>
            ))}

            <div className="cc-avatarWrap" aria-hidden="true">
              <div className="cc-avatarFace">🧸</div>
            </div>
          </Reveal>

          {/* ── MAIN BODY ── */}
          {!hasChatted ? (
            <motion.section
              className="cc-heroSection"
              variants={staggerContainerVariants}
              initial="hidden"
              animate="show"
            >
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
                    className={`cc-promptCard${card.savings ? " cc-promptCard--savings" : ""}`}
                    onClick={() => sendMessage(card.text)}
                    variants={staggerItemVariants}
                    {...cardMotion}
                  >
                    <span className="cc-promptIcon">
                      {card.savings ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Z"/>
                          <path d="M12 6v6l4 2"/>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                        </svg>
                      )}
                    </span>
                    <div className="cc-promptCardText">
                      <span className="cc-promptTitle">{card.title}</span>
                      <span className="cc-promptSub">{card.text}</span>
                    </div>
                  </motion.button>
                ))}
              </motion.div>

              <div className="cc-heroInputArea">
                <form className="cc-heroForm" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="무엇이든 물어보세요"
                    className="cc-heroInput"
                  />
                </form>
              </div>
            </motion.section>
          ) : (
            <motion.section
              className="cc-chatPanel"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
            >
              <div className="cc-chatMessages" role="log" aria-live="polite">
                {messages.map((item) =>
                  item.role === "user" ? (
                    <div key={item.id} className="cc-bubble cc-bubble--user">
                      <span className="cc-bubbleRole">나</span>
                      <p>{item.text}</p>
                      <span className="cc-bubbleTime">{item.time}</span>
                    </div>
                  ) : item.reply?.type === "insight" ? (
                    <div key={item.id} className="cc-bubble cc-bubble--asst">
                      <span className="cc-bubbleRole">코치</span>
                      <p className="cc-insightGreeting">{item.reply.greeting}</p>
                      <div className="cc-insightCard">
                        <p className="cc-insightTitle">{item.reply.title}</p>
                        <p className="cc-insightSummary">{item.reply.summary}</p>
                        <ul className="cc-insightBullets">
                          {item.reply.bullets.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                        <p className="cc-insightFooter">{item.reply.footer}</p>
                      </div>
                      <span className="cc-bubbleTime">{item.time}</span>
                    </div>
                  ) : item.reply?.type === "piggy" ? (
                    <div key={item.id} className="cc-bubble cc-bubble--asst">
                      <span className="cc-bubbleRole">코치</span>
                      <p>{item.reply.text}</p>
                      <button
                        type="button"
                        className="cc-piggyInlineBtn"
                        onClick={() => handleCcSave(item.reply.amount)}
                      >
                        저금통에 넣기
                      </button>
                      <span className="cc-bubbleTime">{item.time}</span>
                    </div>
                  ) : (
                    <div key={item.id} className="cc-bubble cc-bubble--asst">
                      <span className="cc-bubbleRole">코치</span>
                      <p>{item.reply?.text}</p>
                      <span className="cc-bubbleTime">{item.time}</span>
                    </div>
                  )
                )}
                <div ref={chatEndRef} />
              </div>

              <form className="cc-chatForm" onSubmit={handleSubmit}>
                <div className="cc-chatInputWrap">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="무엇이든 물어보세요"
                    className="cc-chatInput"
                  />
                  <button type="submit" className="cc-sendButton">전송</button>
                </div>
              </form>
            </motion.section>
          )}
        </main>
      </div>

      {ccSaveToast !== null && (
        <div className="cc-saveToast" role="status" aria-live="polite">
          🪙 {ccSaveToast.toLocaleString()}원이 저축 저금통에 반영됐어요!
        </div>
      )}
    </div>
  );
}
