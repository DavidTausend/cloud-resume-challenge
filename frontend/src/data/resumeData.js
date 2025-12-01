const ResumeData = {
  personalInfo: {
    name: "David Tausend",
    addressLine: "Weitlingstr. 85, Berlin, 10317",
    email: "davidtausend@hotmail.com",
    phone: "+49 178-007-1111",
  },

  sections: {
    education: {
      title: "Bildung",
      items: [
        {
          school: "Code Institute",
          degree: "Diploma in Full Stack Software Development",
          location: "Online",
          duration: "10.2023 – Aktuell",
        },
        {
          school: "ITCA",
          degree: "CCNA",
          location: "El Salvador",
          duration: "2016 – 2017",
        },
        {
          school: "Universidad Dr. José Matías Delgado",
          degree: "Informatiker",
          location: "San Salvador, El Salvador",
          duration: "2009 – 2015",
        },
      ],
    },

    experience: {
      title: "Experience",
      items: [
        {
          role: "Cloud Application Manager",
          company: "Haiilo GmbH",
          location: "Berlin, Deutschland",
          duration: "02.2024 – Aktuell",
          bullets: [
            "Pflege und Optimierung der Kubernetes- und Rancher-Umgebungen.",
            "Projektleitung bei Implementierung großer Haiilo-Plattformen.",
            "3rd-Level-Support für komplexe technische Herausforderungen.",
            "Weiterentwicklung der Cloud-Infrastruktur (private + public).",
          ],
        },
        {
          role: "System- und Netzwerkadministrator",
          company: "Servisa Unternehmensgruppe GmbH",
          location: "Berlin, Deutschland",
          duration: "02.2023 – 02.2024",
          bullets: [
            "Migration lokaler Infrastrukturen in Cloud-Umgebungen.",
            "Aufbau skalierbarer AWS- und Azure-Infrastrukturen.",
            "VMware-Administration (vSphere, ESXi, vMotion, iSCSI).",
            "Wartung und Upgrades von ESXi-Hosts + VCSA.",
          ],
        },
        {
          role: "IT-Systemadministrator",
          company: "Neurocat GmbH",
          location: "Berlin, Deutschland",
          duration: "09.2021 – 01.2023",
          bullets: [
            "Verwaltung von GitLab-Repositories und Berechtigungen.",
            "Disaster-Recovery-Planung & regelmäßige Tests.",
            "Implementierung von MFA & SSO.",
          ],
        },
        {
          role: "IT-Systemadministrator",
          company: "Act.3 GmbH",
          location: "Berlin, Deutschland",
          duration: "04.2020 – 08.2021",
          bullets: [
            "Fehleranalyse und technische Problembehebung.",
            "Arbeiten mit agilen Methoden (Jira, Confluence).",
            "Onboarding/Offboarding-Automatisierung.",
          ],
        },
        {
          role: "MIS / NOC",
          company: "Euronet / Ria GmbH",
          location: "Berlin, Deutschland",
          duration: "05.2019 – 03.2020",
          bullets: [
            "Hardware- und Softwarediagnose & Reparatur.",
            "Aufbau neuer Netzwerkinfrastrukturen.",
          ],
        },
        {
          role: "DevOps Support",
          company: "Euronet / Ria S.V.",
          location: "San Salvador, El Salvador",
          duration: "04.2017 – 03.2019",
          bullets: [
            "Einführung neuer Anwendungen.",
            "Optimierung agiler Skalierungsstrukturen.",
            "SQL-Abfragen & Elasticsearch-Monitoring.",
          ],
        },
        {
          role: "NOC",
          company: "Euronet / Epay S.V.",
          location: "San Salvador, El Salvador",
          duration: "05.2015 – 03.2017",
          bullets: [
            "Netzwerküberwachung & Fehlerdiagnose.",
            "Behebung von System- und Netzwerkstörungen.",
          ],
        },
        {
          role: "Technical Support",
          company: "Euronet / Ria S.V.",
          location: "San Salvador, El Salvador",
          duration: "05.2015 – 03.2017",
          bullets: [
            "Schnelle Identifikation technischer Probleme.",
            "Nachverfolgung bis vollständige Problemlösung.",
          ],
        },
      ],
    },

    leadership: {
      title: "Führung & Aktivitäten",
      items: [
        {
          name: "Cloud Resume Challenge Bootcamp",
          role: "Maintainer des Community-Projekts",
          location: "Online",
          duration: "Zurzeit",
        },
      ],
    },

    certifications: {
      title: "Zertifikate",
      providers: [
        {
          name: "Google",
          certifications: [
            {
              name: "Cloud Digital Leader",
              validity: "Jun 2025–Jun 2028",
            },
          ],
        },
        {
          name: "AWS",
          certifications: [
            "AWS Solutions Architect — Associate",
            "AWS Developer — Associate",
            "AWS SysOps Administrator — Associate",
            "AWS Cloud Practitioner",
          ],
        },
        {
          name: "ExamPro",
          certifications: [
            "Networking Fundamentals Bootcamp",
            "GenAI Bootcamp (Gold Squad)",
            "AWS Cloud Project Bootcamp (Gold Squad)",
            "Terraform Beginner Bootcamp",
          ],
        },
        {
          name: "Code Institute",
          certifications: [
            "Diploma in Full Stack Software Development",
          ],
        },
        {
          name: "HashiCorp",
          certifications: [
            "Terraform Associate (003)",
          ],
        },
      ],
    },

    skills: {
      title: "Fähigkeiten & Interessen",
    },
  },
};

export default ResumeData;