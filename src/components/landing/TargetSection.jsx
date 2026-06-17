function TargetSection({ targetUsers }) {
  return (
    <section className="target-section reveal-group" id="target" aria-labelledby="target-title">
      <div className="section-heading reveal-child">
        <p>For You</p>
        <h2 id="target-title">이런 분들에게 추천해요</h2>
      </div>

      <div className="target-list">
        {targetUsers.map((item, index) => (
          <article
            className="target-bubble reveal-child"
            key={item}
            style={{ '--reveal-delay': `${index * 90}ms` }}
          >
            {item}
          </article>
        ))}
      </div>
    </section>
  );
}

export default TargetSection;
