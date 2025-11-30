export default function ResumePage() {
  return (
    <>
      {/* PERSONAL INFO */}
      <header>
        <h1>David Tausend</h1>
        <p>
          Weitlingstr. 85, Berlin, 10317 &bull;{' '}
          <a href="mailto:davidtausend@hotmail.com">
            davidtausend@hotmail.com
          </a>{' '}
          &bull; +49 178-007-1111
        </p>
      </header>

      {/* EDUCATION */}
      <section className="education">
        <h2>Bildung</h2>

        <div className="items">
          <div className="item">
            <div className="info">
              <h3>Code Institute</h3>
              <p>Diploma in Full Stack Software Development</p>
            </div>
            <div className="details">
              <div className="location">Online</div>
              <div className="duration">10.2023 – Aktuell</div>
            </div>
          </div>

          <div className="item">
            <div className="info">
              <h3>ITCA</h3>
              <p>CCNA</p>
            </div>
            <div className="details">
              <div className="location">El Salvador</div>
              <div className="duration">2016 – 2017</div>
            </div>
          </div>

          <div className="item">
            <div className="info">
              <h3>Universidad Dr. José Matías Delgado</h3>
              <p>Informatiker</p>
            </div>
            <div className="details">
              <div className="location">San Salvador, El Salvador</div>
              <div className="duration">2009 – 2015</div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="experience">
        <h2>Experience</h2>

        <div className="item">
          <div className="info">
            <h3>Cloud Application Manager</h3>
            <p>Haiilo GmbH</p>
            <div className="details">
              <div className="location">Berlin, Deutschland</div>
              <div className="duration">02.2024 – Aktuell</div>
            </div>
            <ul>
              <li>Pflege und Optimierung der Kubernetes- und Rancher-Umgebungen.</li>
              <li>Projektleitung bei Implementierung großer Haiilo-Plattformen.</li>
              <li>3rd-Level-Support für komplexe technische Herausforderungen.</li>
              <li>Weiterentwicklung der Cloud-Infrastruktur (private + public).</li>
            </ul>
          </div>
        </div>

        <div className="item">
          <div className="info">
            <h3>System- und Netzwerkadministrator</h3>
            <p>Servisa Unternehmensgruppe GmbH</p>
            <div className="details">
              <div className="location">Berlin, Deutschland</div>
              <div className="duration">02.2023 – 02.2024</div>
            </div>
            <ul>
              <li>Migration lokaler Infrastrukturen in Cloud-Umgebungen.</li>
              <li>Aufbau skalierbarer AWS- und Azure-Infrastrukturen.</li>
              <li>VMware-Administration (vSphere, ESXi, vMotion, iSCSI).</li>
              <li>Wartung und Upgrades von ESXi-Hosts + VCSA.</li>
            </ul>
          </div>
        </div>

        <div className="item">
          <div className="info">
            <h3>IT-Systemadministrator</h3>
            <p>Neurocat GmbH</p>
            <div className="details">
              <div className="location">Berlin, Deutschland</div>
              <div className="duration">09.2021 – 01.2023</div>
            </div>
            <ul>
              <li>Verwaltung von GitLab-Repositories und Berechtigungen.</li>
              <li>Disaster-Recovery-Planung & regelmäßige Tests.</li>
              <li>Implementierung von MFA & SSO.</li>
            </ul>
          </div>
        </div>

        <div className="item">
          <div className="info">
            <h3>IT-Systemadministrator</h3>
            <p>Act.3 GmbH</p>
            <div className="details">
              <div className="location">Berlin, Deutschland</div>
              <div className="duration">04.2020 – 08.2021</div>
            </div>
            <ul>
              <li>Fehleranalyse und technische Problembehebung.</li>
              <li>Arbeiten mit agilen Methoden (Jira, Confluence).</li>
              <li>Onboarding/Offboarding-Automatisierung.</li>
            </ul>
          </div>
        </div>

        <div className="item">
          <div className="info">
            <h3>MIS / NOC</h3>
            <p>Euronet / Ria GmbH</p>
            <div className="details">
              <div className="location">Berlin, Deutschland</div>
              <div className="duration">05.2019 – 03.2020</div>
            </div>
            <ul>
              <li>Hardware- und Softwarediagnose & Reparatur.</li>
              <li>Aufbau neuer Netzwerkinfrastrukturen.</li>
            </ul>
          </div>
        </div>

        <div className="item">
          <div className="info">
            <h3>DevOps Support</h3>
            <p>Euronet / Ria S.V.</p>
            <div className="details">
              <div className="location">San Salvador, El Salvador</div>
              <div className="duration">04.2017 – 03.2019</div>
            </div>
            <ul>
              <li>Einführung neuer Anwendungen.</li>
              <li>Optimierung agiler Skalierungsstrukturen.</li>
              <li>SQL-Abfragen & Elasticsearch-Monitoring.</li>
            </ul>
          </div>
        </div>

        <div className="item">
          <div className="info">
            <h3>NOC</h3>
            <p>Euronet / Epay S.V.</p>
            <div className="details">
              <div className="location">San Salvador, El Salvador</div>
              <div className="duration">05.2015 – 03.2017</div>
            </div>
            <ul>
              <li>Netzwerküberwachung & Fehlerdiagnose.</li>
              <li>Behebung von System- und Netzwerkstörungen.</li>
            </ul>
          </div>
        </div>

        <div className="item">
          <div className="info">
            <h3>Technical Support</h3>
            <p>Euronet / Ria S.V.</p>
            <div className="details">
              <div className="location">San Salvador, El Salvador</div>
              <div className="duration">05.2015 – 03.2017</div>
            </div>
            <ul>
              <li>Schnelle Identifikation technischer Probleme.</li>
              <li>Nachverfolgung bis vollständige Problemlösung.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="leadership">
        <h2>Führung & Aktivitäten</h2>
        <div className="items">
          <div className="item">
            <div className="info">
              <h3>Cloud Resume Challenge Bootcamp</h3>
            <p>Maintainer des Community-Projekts</p>
              <div className="details">
                <div className="location">Online</div>
                <div className="duration">Zurzeit</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="certifications">
        <h2>Zertifikate</h2>

        <div className="items">
          <div className="item">
            <div className="info">
              <h3>Google</h3>
              <ul>
                <li>
                  <strong>Cloud Digital Leader</strong> — Jun 2025–Jun 2028
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="items">
          <div className="item">
            <div className="info">
              <h3>AWS</h3>
              <ul>
                <li>AWS Solutions Architect — Associate</li>
                <li>AWS Developer — Associate</li>
                <li>AWS SysOps Administrator — Associate</li>
                <li>AWS Cloud Practitioner</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="items">
          <div className="item">
            <div className="info">
              <h3>ExamPro</h3>
              <ul>
                <li>Networking Fundamentals Bootcamp</li>
                <li>GenAI Bootcamp (Gold Squad)</li>
                <li>AWS Cloud Project Bootcamp (Gold Squad)</li>
                <li>Terraform Beginner Bootcamp</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="items">
          <div className="item">
            <div className="info">
              <h3>Code Institute</h3>
              <ul>
                <li>Diploma in Full Stack Software Development</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="items">
          <div className="item">
            <div className="info">
              <h3>HashiCorp</h3>
              <ul>
                <li>Terraform Associate (003)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="skills">
        <h2>Fähigkeiten & Interessen</h2>
      </section>
    </>
  );
}