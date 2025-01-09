document.getElementById('recommendButton').addEventListener('click', function() {
      const summary = document.getElementById('ehrSummary').value.toLowerCase();
      const icdRecommendationsDiv = document.querySelector('.icd-recommendations');
      const cptRecommendationsDiv = document.querySelector('.cpt-recommendations');
      icdRecommendationsDiv.innerHTML = '';
      cptRecommendationsDiv.innerHTML = '';

      const icdCodes = {
        "diabetes": ["E11.9", "E10.9"],
        "hypertension": ["I10", "I11"],
        "headache": ["R51", "G43.9"],
        "fever": ["R50.9", "R50.81"],
        "cough": ["R05", "R05.9"],
        "fracture": ["S52.5", "S52.501A"],
        "infection": ["A49.9", "B99"],
        "pain": ["R52", "R52.9"],
        "nausea": ["R11", "R11.2"],
        "vomiting": ["R11", "R11.1"]
      };

      const cptCodes = {
        "physical exam": ["99202", "99213"],
        "blood test": ["85025", "85027"],
        "x-ray": ["71045", "71046"],
        "ecg": ["93000", "93005"],
        "consultation": ["99242", "99243"],
        "injection": ["96372", "96374"],
        "wound care": ["11042", "11043"],
        "therapy": ["97110", "97112"],
        "surgery": ["10060", "10061"],
        "ultrasound": ["76700", "76705"]
      };

      let icdMatches = [];
      for (const keyword in icdCodes) {
        if (summary.includes(keyword)) {
          icdMatches = icdMatches.concat(icdCodes[keyword]);
        }
      }

      let cptMatches = [];
      for (const keyword in cptCodes) {
        if (summary.includes(keyword)) {
          cptMatches = cptMatches.concat(cptCodes[keyword]);
        }
      }

      if (icdMatches.length > 0) {
        icdRecommendationsDiv.innerHTML += '<h3>Recommended ICD Codes:</h3><ul>';
        icdMatches.forEach(code => {
          icdRecommendationsDiv.innerHTML += `<li>${code}</li>`;
        });
        icdRecommendationsDiv.innerHTML += '</ul>';
      } else {
        icdRecommendationsDiv.innerHTML = '<p>No ICD codes found.</p>';
      }

      if (cptMatches.length > 0) {
        cptRecommendationsDiv.innerHTML += '<h3>Recommended CPT Codes:</h3><ul>';
        cptMatches.forEach(code => {
          cptRecommendationsDiv.innerHTML += `<li>${code}</li>`;
        });
        cptRecommendationsDiv.innerHTML += '</ul>';
      } else {
        cptRecommendationsDiv.innerHTML = '<p>No CPT codes found.</p>';
      }
    });

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then(registration => {
            console.log('Service worker registered:', registration);
          })
          .catch(error => {
            console.error('Service worker registration failed:', error);
          });
      });
    }
