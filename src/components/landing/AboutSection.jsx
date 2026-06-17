function AboutSection() {
  return (
    <section className="about-section reveal-group" id="about" aria-labelledby="about-title">
      <div className="bubble-scene" aria-hidden="true">
        <div className="bubble bubble-question reveal-child">오늘 무슨 옷 입지?</div>
        <div className="bubble bubble-answer reveal-child">오모가 도와줄게 !</div>
      </div>

      <div className="about-copy reveal-child">
        <h2 id="about-title">
          매일 아침, “오늘 뭐 입지?”라는 고민으로 시간을 쓰고 있나요?
        </h2>
        <p>
          오모는 사용자가 입력한 상황, 취향, 선호 스타일을 분석해 오늘의 외출에
          어울리는 코디를 추천해주는 AI 기반 OOTD 추천 서비스입니다. 상황에 맞는
          스타일링은 물론, 추천 코디에 어울리는 상세 제품 정보까지 한눈에 확인할 수
          있어 더 이상 옷 고르는 데 시간을 낭비하지 않아도 됩니다.
        </p>
      </div>
    </section>
  );
}

export default AboutSection;
