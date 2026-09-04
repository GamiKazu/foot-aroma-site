(() => {
  const app = document.getElementById("diagnosis-app");
  if (!app) return;

  const questions = [
    { id: "fatigue", text: "足の疲れを感じますか？", options: [["ほとんど感じない", 0], ["少し感じる", 1], ["強く感じる", 2]] },
    { id: "swelling", text: "足のむくみが気になりますか？", options: [["ほとんど気にならない", 0], ["ときどき気になる", 1], ["よく気になる", 2]] },
    { id: "cold", text: "足先の冷えを感じますか？", options: [["ほとんど感じない", 0], ["ときどき感じる", 1], ["よく感じる", 2]] },
    { id: "standing", text: "立ったり歩いたりする時間は長いですか？", options: [["短い", 0], ["やや長い", 1], ["とても長い", 2]] },
    { id: "tension", text: "足裏に硬さや張りを感じますか？", options: [["ほとんど感じない", 0], ["少し感じる", 1], ["強く感じる", 2]] },
    { id: "dryness", text: "足裏の乾燥が気になりますか？", options: [["ほとんど気にならない", 0], ["少し気になる", 1], ["かなり気になる", 2]] },
    { id: "color", text: "現在の足裏は、どの色に近く見えますか？", color: true, options: [["ピンク系", "pink"], ["白っぽい", "white"], ["赤っぽい", "red"], ["黄色っぽい", "yellow"], ["オレンジっぽい", "orange"]] },
    { id: "temperature", text: "足を触ったときの温度は？", options: [["温かい", 0], ["普通", 1], ["冷たい", 2]] },
    { id: "sleep", text: "最近、よく眠れていますか？", options: [["よく眠れている", 0], ["日によって違う", 1], ["あまり眠れていない", 2]] },
    { id: "stress", text: "ストレスや気分の疲れを感じますか？", options: [["ほとんど感じない", 0], ["少し感じる", 1], ["強く感じる", 2]] },
    { id: "stomach", text: "最近、胃腸の調子が気になりますか？", options: [["ほとんど気にならない", 0], ["ときどき気になる", 1], ["よく気になる", 2]] },
    { id: "priority", text: "今、いちばん整えたいことは？", options: [["足の疲れ", "fatigue"], ["むくみ", "swelling"], ["冷え", "cold"], ["睡眠", "sleep"], ["気分", "stress"], ["足裏のケア", "foot"]] }
  ];

  const resultData = {
    balance: { title: "大きな偏りは少ない傾向", desc: "今のところ強く気になる項目は少ないようです。無理なく続けられるケアで状態を振り返りましょう。", care: ["入浴後に足首をゆっくり回す", "足裏を手のひらで包み、心地よい強さで触れる", "疲れを感じる前に短い休憩をとる"], zone: "足裏全体", aroma: "好きな香り／スイートオレンジ" },
    fatigue: { title: "足の疲れが気になる傾向", desc: "足を休ませ、ふくらはぎまでやさしく動かすケアがおすすめです。", care: ["椅子に座り、足首を前後に10回ずつ動かす", "足裏を手のひらで包み、土踏まずをやさしく押す", "入浴後にふくらはぎを下から上へ軽くさする"], zone: "土踏まず・足裏全体", aroma: "ペパーミント／ラベンダー" },
    swelling: { title: "むくみが気になる傾向", desc: "同じ姿勢を減らし、足首とふくらはぎをこまめに動かしましょう。", care: ["1時間に一度を目安に立って歩く", "足首をゆっくり10回ずつ回す", "横になるときは足を少し高くして休む"], zone: "腎臓・尿管・膀胱周辺", aroma: "グレープフルーツ／ジュニパーベリー" },
    cold: { title: "足先の冷えが気になる傾向", desc: "足首を冷やさず、無理のない範囲で温めて動かすケアが向いています。", care: ["38〜40℃程度のお湯で短時間の足湯をする", "足指のグー・パーを10回繰り返す", "靴下やレッグウォーマーで足首を保温する"], zone: "太陽神経叢・腎臓周辺", aroma: "スイートオレンジ／ジンジャー" },
    standing: { title: "立ち仕事・歩き疲れの傾向", desc: "足裏だけでなく、ふくらはぎまでまとめて休ませるのがポイントです。", care: ["帰宅後に靴を脱いで足指をゆっくり広げる", "ふくらはぎを伸ばすストレッチを20秒行う", "靴やインソールの当たり方を見直す"], zone: "かかと・足裏全体", aroma: "ローズマリー／レモン" },
    tension: { title: "足裏の硬さ・張りが気になる傾向", desc: "強く押さず、温めてから少しずつほぐしましょう。", care: ["入浴後、土踏まずを親指でやさしく押す", "テニスボールを足裏で軽く転がす", "痛みが出るほど強く刺激しない"], zone: "土踏まず・かかと周辺", aroma: "ラベンダー／マジョラム" },
    dryness: { title: "足裏の乾燥が気になる傾向", desc: "洗いすぎを避け、入浴後の保湿を習慣にしましょう。", care: ["入浴後、足裏の水分をやさしく拭き取る", "無香料の保湿剤を薄く塗る", "ひび割れ部分を無理に削らない"], zone: "足裏全体をやさしくケア", aroma: "ラベンダー／フランキンセンス" },
    sleep: { title: "睡眠・休息不足が気になる傾向", desc: "就寝前に光と刺激を減らし、足元からゆるめる時間をつくりましょう。", care: ["就寝前にゆっくり腹式呼吸をする", "足首を回して力を抜く", "寝る直前のスマートフォン利用を短くする"], zone: "親指・太陽神経叢周辺", aroma: "ベルガモット／ラベンダー" },
    stress: { title: "ストレス・気分の疲れが気になる傾向", desc: "短い時間でも、呼吸と香りに意識を向ける休息がおすすめです。", care: ["4秒吸って6秒吐く呼吸を数回行う", "親指の腹を反対の手でやさしく包む", "好きな香りをティッシュに1滴垂らして楽しむ"], zone: "親指・太陽神経叢周辺", aroma: "ベルガモット／スイートオレンジ" },
    stomach: { title: "胃まわりの調子が気になる傾向", desc: "食事と休息のリズムを整え、足裏はやさしい刺激に留めましょう。", care: ["食後すぐの強い足裏刺激を避ける", "温かい飲み物でゆっくり休む", "土踏まずを手のひらでやさしく温める"], zone: "土踏まず上部", aroma: "スイートオレンジ／レモン" }
  };

  const colorDots = { pink: "#e9a9a5", white: "#eee9df", red: "#cf7065", yellow: "#dfc267", orange: "#d99358" };

  app.innerHTML = `
    <style>
      .dq-hero,.dq-form-section,.dq-result-section{padding:88px 0}.dq-hero{background:linear-gradient(145deg,#f8f4eb,#e8eee5);overflow:hidden}
      .dq-hero-card,.dq-form,.dq-result-card{max-width:900px;margin:auto;background:rgba(255,255,255,.88);border:1px solid rgba(83,104,79,.12);border-radius:32px;padding:64px;box-shadow:0 18px 55px rgba(53,62,55,.07)}
      .dq-hero-card{max-width:1180px;padding:0;overflow:hidden;background:#f8f4eb;border-color:rgba(151,121,66,.18);box-shadow:0 24px 70px rgba(53,62,55,.12)}
      .dq-hero-visual img{display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover}
      .dq-kicker{color:#738972;font-size:.78rem;font-weight:800;letter-spacing:.22em}.dq-hero h1{font-family:serif;font-size:clamp(2.2rem,5.2vw,4.2rem);font-weight:400;line-height:1.35;margin:18px 0}.dq-lead{color:#747c75;max-width:650px}.dq-button{display:inline-flex;justify-content:center;align-items:center;border:0;border-radius:999px;background:#53684f;color:#fff;padding:16px 28px;font:inherit;font-weight:700;cursor:pointer;text-decoration:none;margin-top:24px}.dq-button:hover{background:#40533e}.dq-note{font-size:.8rem;color:#747c75;margin-top:14px}
      .dq-form-section{background:#f8f4eb}.dq-form-head{text-align:center;margin-bottom:28px}.dq-form-head h2{font-family:serif;font-size:clamp(1.8rem,4.5vw,3rem);font-weight:400}.dq-progress-text{display:flex;justify-content:space-between;color:#738972;font-size:.78rem;font-weight:800;letter-spacing:.08em}.dq-progress{height:6px;margin:12px 0 28px;background:#e5ece2;border-radius:99px;overflow:hidden}.dq-progress span{display:block;width:33.33%;height:100%;background:#738972;border-radius:99px;transition:width .25s}.dq-step{display:none}.dq-step.is-active{display:block}.dq-question{border:0;border-top:1px solid rgba(45,50,46,.1);padding:28px 0;margin:0}.dq-question legend{display:block;width:100%;font-size:1.08rem;font-weight:700;margin-bottom:18px}.dq-number{display:block;color:#738972;font-size:.72rem;letter-spacing:.15em;margin:0 0 7px}.dq-options{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.dq-options.six{grid-template-columns:repeat(3,1fr)}.dq-option{position:relative}.dq-option input{position:absolute;opacity:0}.dq-option label{display:flex;align-items:center;justify-content:center;min-height:58px;padding:12px;border:1px solid #d4dfd0;border-radius:14px;background:#fff;text-align:center;cursor:pointer}.dq-option input:checked+label{background:#53684f;color:#fff;border-color:#53684f}.dq-swatch{width:18px;height:18px;border-radius:50%;border:1px solid rgba(0,0,0,.1);margin-right:8px}.dq-error{display:none;color:#a24f45;text-align:center;margin-top:14px}.dq-nav{display:flex;gap:12px;justify-content:space-between}.dq-nav .dq-button{min-width:150px}.dq-back{background:transparent;color:#53684f;border:1px solid #53684f}
      .dq-result-section{display:none;background:#eef2e9;scroll-margin-top:var(--header-height)}.dq-score{text-align:center}.dq-score strong{display:block;color:#53684f;font-family:serif;font-size:4.5rem;line-height:1}.dq-score span{color:#747c75}.dq-rating{display:inline-block;margin-top:14px;padding:7px 16px;border-radius:99px;background:#e5ece2;color:#40533e!important;font-weight:800}.dq-summary{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-top:28px}.dq-summary-item{padding:18px;background:#f3f6f1;border-radius:16px}.dq-summary-item span{display:block;color:#738972;font-size:.7rem;font-weight:800;letter-spacing:.08em}.dq-summary-item strong{display:block;margin-top:5px}.dq-result-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:22px}.dq-result-item{background:#fff;border-radius:22px;padding:28px}.dq-result-item h3{margin-top:0}.dq-result-item ul{padding-left:1.3em;color:#747c75}.dq-result-meta{border-top:1px solid rgba(45,50,46,.1);padding-top:16px;margin-top:20px}.dq-zone-link{display:inline-flex;margin-top:12px;color:#53684f;font-weight:800;text-decoration:none}.dq-disclaimer{margin-top:28px;padding:20px;border-radius:16px;background:#f8f4eb;color:#606860;font-size:.84rem}.dq-retry{background:transparent;color:#53684f;border:1px solid #53684f;margin-left:8px}
      @media(max-width:768px){.dq-hero{padding:18px 12px 24px}.dq-form-section,.dq-result-section{padding:30px 18px}.dq-hero-card{border-radius:22px}.dq-form,.dq-result-card{padding:28px 20px;border-radius:24px}.dq-hero-visual img{aspect-ratio:auto;object-fit:contain}.dq-options,.dq-options.six{grid-template-columns:1fr}.dq-result-grid,.dq-summary{grid-template-columns:1fr}.dq-question{padding:22px 0}.dq-option label{min-height:54px}.dq-button{width:100%}.dq-nav .dq-button{min-width:0;margin-top:18px}.dq-retry{margin-left:0}.dq-score strong{font-size:4rem}}
    </style>
    <section class="dq-hero"><div class="container"><div class="dq-hero-card">
      <div class="dq-hero-visual">
        <img src="diagnosis-banner.png" alt="足裏タイプ診断 ― リフレクソロジーとアロマテラピー" width="1680" height="945" fetchpriority="high">
      </div>
    </div></div></section>
    <section id="question-check" class="dq-form-section"><div class="container"><form class="dq-form" id="dq-form" novalidate>
      <div class="dq-form-head"><span class="dq-kicker">12 QUESTIONS</span><h2>今の状態を教えてください。</h2><p>もっとも近いものを一つずつ選んでください。</p></div>
      <div class="dq-progress-text"><span id="dq-step-label">1 / 3　疲れ・むくみ・冷え</span><span id="dq-count-label">Q1–Q4 / 12</span></div><div class="dq-progress"><span id="dq-progress-bar"></span></div>
      <div id="dq-questions"></div><p class="dq-error" id="dq-error">このページの質問すべてに回答してください。</p><div class="dq-nav"><button class="dq-button dq-back" id="dq-back" type="button">戻る</button><button class="dq-button" id="dq-next" type="button">次へ</button><button class="dq-button" id="dq-submit" type="submit">結果を見る</button></div>
    </form></div></section>
    <section id="diagnosis-result" class="dq-result-section"><div class="container"><div class="dq-result-card" aria-live="polite">
      <div class="dq-score"><span>今日のコンディション</span><strong id="dq-score">--</strong><span>点 / 100点</span><span class="dq-rating" id="dq-rating">--</span></div>
      <div class="dq-summary" id="dq-summary"></div>
      <div class="dq-result-grid" id="dq-result-grid"></div>
      <div class="dq-disclaimer"><strong>この結果について</strong><br>回答をもとにしたセルフケアの目安であり、病気の診断や治療を目的とするものではありません。片足だけの急な腫れ、強い痛み・しびれ、皮膚の大きな変化などがある場合は、セルフケアを中止して医療機関へ相談してください。精油は原液を皮膚につけず、妊娠中・持病がある方・乳幼児やペットがいる環境では使用方法を専門家に確認してください。</div>
      <button class="dq-button dq-retry" id="dq-retry" type="button">もう一度チェックする</button>
    </div></div></section>`;

  const questionRoot = document.getElementById("dq-questions");
  const stepNames = ["疲れ・むくみ・冷え", "足裏の状態", "休息・生活・希望"];
  const stepRoots = stepNames.map((name, index) => {
    const step = document.createElement("div");
    step.className = `dq-step${index === 0 ? " is-active" : ""}`;
    step.dataset.step = index;
    questionRoot.appendChild(step);
    return step;
  });
  questions.forEach((q, index) => {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "dq-question";
    const optionsClass = q.options.length > 3 ? "dq-options six" : "dq-options";
    fieldset.innerHTML = `<legend><span class="dq-number">Q${String(index + 1).padStart(2, "0")}</span>${q.text}</legend><div class="${optionsClass}">${q.options.map(([label, value], optionIndex) => {
      const swatch = q.color ? `<span class="dq-swatch" style="background:${colorDots[value]}"></span>` : "";
      return `<div class="dq-option"><input type="radio" id="${q.id}-${optionIndex}" name="${q.id}" value="${value}" required><label for="${q.id}-${optionIndex}">${swatch}${label}</label></div>`;
    }).join("")}</div>${q.color ? '<p class="dq-note">照明・肌の色・その日の状態によって見え方が異なります。最も近い色を選んでください。</p>' : ""}`;
    stepRoots[Math.floor(index / 4)].appendChild(fieldset);
  });

  const form = document.getElementById("dq-form");
  const error = document.getElementById("dq-error");
  const backButton = document.getElementById("dq-back");
  const nextButton = document.getElementById("dq-next");
  const submitButton = document.getElementById("dq-submit");
  let currentStep = 0;

  function showStep(index, shouldScroll = true) {
    currentStep = index;
    stepRoots.forEach((step, stepIndex) => step.classList.toggle("is-active", stepIndex === index));
    document.getElementById("dq-step-label").textContent = `${index + 1} / 3　${stepNames[index]}`;
    document.getElementById("dq-count-label").textContent = `Q${index * 4 + 1}–Q${index * 4 + 4} / 12`;
    document.getElementById("dq-progress-bar").style.width = `${((index + 1) / 3) * 100}%`;
    backButton.style.visibility = index === 0 ? "hidden" : "visible";
    nextButton.style.display = index === 2 ? "none" : "inline-flex";
    submitButton.style.display = index === 2 ? "inline-flex" : "none";
    error.style.display = "none";
    if (shouldScroll) document.getElementById("question-check").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function currentStepIsComplete() {
    return questions.slice(currentStep * 4, currentStep * 4 + 4).every(q => form.querySelector(`input[name="${q.id}"]:checked`));
  }

  nextButton.addEventListener("click", () => {
    if (!currentStepIsComplete()) {
      error.style.display = "block";
      return;
    }
    showStep(currentStep + 1);
  });
  backButton.addEventListener("click", () => showStep(currentStep - 1));
  showStep(0, false);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    if (questions.some(q => !formData.has(q.id))) {
      document.getElementById("dq-error").style.display = "block";
      return;
    }
    const n = id => Number(formData.get(id));
    const scores = {
      fatigue: n("fatigue") * 2 + n("standing"), swelling: n("swelling") * 2 + n("standing"),
      cold: n("cold") * 2 + n("temperature"), standing: n("standing") * 2 + n("fatigue"),
      tension: n("tension") * 2 + n("standing"), dryness: n("dryness") * 2,
      sleep: n("sleep") * 2 + n("stress"), stress: n("stress") * 2 + n("sleep"), stomach: n("stomach") * 2
    };
    const color = formData.get("color");
    if (color === "white") scores.cold += 1;
    if (color === "red" || color === "orange") scores.fatigue += 1;
    if (color === "yellow") scores.dryness += 1;
    const priority = formData.get("priority");
    const priorityMap = { fatigue: "fatigue", swelling: "swelling", cold: "cold", sleep: "sleep", stress: "stress", foot: "tension" };
    scores[priorityMap[priority]] += 2;
    const burden = n("fatigue") + n("swelling") + n("cold") + n("standing") + n("tension") + n("dryness") + n("temperature") + n("sleep") + n("stress") + n("stomach");
    const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    if (burden <= 3) ranked.unshift(["balance", 0]);
    const condition = Math.max(20, Math.round(100 - (burden / 20) * 80));
    document.getElementById("dq-score").textContent = condition;
    const rating = condition >= 80 ? "良好" : condition >= 60 ? "少しお疲れ" : condition >= 40 ? "休息を意識" : "無理せずケア";
    document.getElementById("dq-rating").textContent = rating;
    const main = resultData[ranked[0][0]];
    const sub = resultData[ranked[1][0]];
    document.getElementById("dq-summary").innerHTML = `
      <div class="dq-summary-item"><span>主な傾向</span><strong>${main.title}</strong></div>
      <div class="dq-summary-item"><span>次に気になる傾向</span><strong>${sub.title}</strong></div>
      <div class="dq-summary-item"><span>おすすめの香り</span><strong>${main.aroma.split("／")[0]}</strong></div>
      <div class="dq-summary-item"><span>今日のケア</span><strong>${main.care[0]}</strong></div>`;
    document.getElementById("dq-result-grid").innerHTML = ranked.slice(0, 2).map(([key], i) => {
      const r = resultData[key];
      return `<article class="dq-result-item"><span class="dq-kicker">${i === 0 ? "MAIN RESULT" : "SUB RESULT"}</span><h3>${r.title}</h3><p>${r.desc}</p><h4>おすすめのセルフケア</h4><ul>${r.care.map(item => `<li>${item}</li>`).join("")}</ul><div class="dq-result-meta"><strong>反射区の目安</strong><br>リフレクソロジーで一般的に対応するとされる「${r.zone}」<br><a class="dq-zone-link" href="reflexology.html#reflex-zones">反射区の位置を見る →</a></div><div class="dq-result-meta"><strong>おすすめの香り</strong><br>${r.aroma}</div></article>`;
    }).join("");
    const result = document.getElementById("diagnosis-result");
    result.style.display = "block";
    document.getElementById("question-check").style.display = "none";
    result.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.getElementById("dq-retry").addEventListener("click", () => {
    form.reset();
    document.getElementById("diagnosis-result").style.display = "none";
    document.getElementById("question-check").style.display = "block";
    showStep(0);
  });
})();
