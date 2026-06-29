const developers = [
  {
    name: "우지영",
    role: "Frontend Developer",
    email: "Woojiyeong.dev@gmail.com",
    github: "github.com/Woojiyeong",
    image: "/Proflie/woojiyeong.jpg",
  },
  {
    name: "박홍준",
    role: "Backend Developer",
    email: "hongjun@hjun.kr",
    github: "github.com/hJun-KR",
    image: "/Proflie/parkhongjun.png",
  },
];

function DeveloperSection() {
  return (
    <section
      className="developer-section reveal-group"
      id="developers"
      aria-labelledby="developers-title"
    >
      <div className="section-heading reveal-child">
        <p>Contact us</p>
        <h2 id="developers-title">오모팀을 소개합니다!</h2>
      </div>

      <div className="developer-list">
        {developers.map((developer, index) => (
          <article
            className="developer-profile reveal-child"
            key={developer.name}
            style={{ "--reveal-delay": `${index * 120}ms` }}
          >
            <img
              className="developer-avatar"
              src={developer.image}
              alt={`${developer.name} 프로필 사진`}
            />
            <div>
              <p className="developer-role">{developer.role}</p>
              <h3>{developer.name}</h3>
              <p className="developer-copy">{developer.copy}</p>
              <dl className="developer-contact">
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${developer.email}`}>{developer.email}</a>
                  </dd>
                </div>
                <div>
                  <dt>GitHub</dt>
                  <dd>
                    <a
                      href={`https://${developer.github}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {developer.github}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default DeveloperSection;
