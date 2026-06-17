const introFrames = [
  {
    eyebrow: '오모는 어떤 서비스인가요?',
    title: ['상황과 취향을 이해하는', '맞춤형 스타일링 앱'],
    copy: [
      '오모는 사용자의 상황과 스타일 취향을 바탕으로 개인에게 어울리는 코디를 추천해주는 맞춤형 스타일링 앱 서비스입니다.',
      '사용자는 자연어로 원하는 코디 상황을 입력할 수 있고, 오모는 이를 분석해 상황에 적합한 OOTD를 제안합니다.',
      '예를 들어 데이트, 학교, 면접, 친구와의 약속, 여행 등 다양한 외출 상황에 맞는 코디를 쉽고 빠르게 추천받을 수 있습니다.',
    ],
  },
  {
    eyebrow: '서비스 목표',
    title: ['오늘 입을 옷을 고르는', '부담을 더 가볍게'],
    copy: [
      '오모의 목표는 사용자의 코디 고민을 줄이고, 개인에게 맞는 스타일을 쉽게 찾을 수 있도록 돕는 것입니다.',
      '매일 옷을 고르는 시간이 부담스럽거나, 자신에게 어울리는 스타일을 찾고 싶은 사용자에게 더 편리하고 직관적인 스타일링 경험을 제공합니다.',
    ],
  },
];

function IntroFramesSection() {
  return (
    <section className="intro-frames-section" id="service" aria-label="오모 서비스 소개">
      {introFrames.map((frame) => (
        <article className="intro-frame reveal-group" key={frame.eyebrow}>
          <div className="intro-frame-title reveal-child">
            <p>{frame.eyebrow}</p>
            <h2>
              {frame.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
          </div>
          <div className="intro-frame-copy reveal-child">
            {frame.copy.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}

export default IntroFramesSection;
