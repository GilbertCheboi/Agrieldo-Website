import React, { useState } from "react";
import "./FieldTripReport.css"; // Ensure this CSS file exists

// Import images if they are in src/assets
import image1 from '../assets/image1.jpeg';
import image2 from '../assets/image2.jpeg';
import image3 from '../assets/image3.jpeg';
import image4 from '../assets/image4.jpeg';
import image5 from '../assets/image5.jpeg';
import image6 from '../assets/image6.jpeg';

// Import jsPDF
import { jsPDF } from "jspdf";

const FieldTripReport = () => {
  const [code, setCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const accessCode = "1234";  // The secret code

  const handleCodeSubmit = (e) => {
    e.preventDefault();

    if (code === accessCode) {
      setIsAuthenticated(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid code. Please try again.');
    }
  };

  // Function to generate and download the PDF report
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Field Trip Report", 20, 20);
    doc.setFontSize(12);

    doc.text("Farm AG002, Moiben", 20, 30);
    doc.text("Purpose of Visit", 20, 40);
    doc.text("To assess the potential of Farm AG002 for setting up a dairy farm with a capacity of up to 15 animals.", 20, 50);

    doc.text("Key Observations", 20, 60);
    doc.text("1. Livestock Health: Three cattle observed on free range, one tethered. Signs of blue ticks and rough fur indicating internal parasite infestation.", 20, 70);
    doc.text("2. Animals lacked identification tags.", 20, 80);
    doc.text("3. Dorper sheep of good breed present.", 20, 90);
    doc.text("4. Sheep shed is in poor condition, exposing animals to risks.", 20, 100);
    doc.text("5. A reliable water source was available for the livestock, but watering points need to be upgraded.", 20, 110);

    // Add more sections as required

    // Add images to the PDF
    doc.addImage(image1, 'JPEG', 20, 120, 50, 50);
    doc.addImage(image2, 'JPEG', 20, 180, 50, 50);

    // Add a link for downloading the PDF
    doc.text("Download Full Report (PDF)", 20, 250);
    
    // Save the generated PDF
    doc.save("field_trip_report.pdf");
  };

  // If authenticated, show the report
  if (isAuthenticated) {
    return (
      <div className="field-trip-report">
        <header className="report-header">
          <h1>Field Trip Report</h1>
          <p className="subtitle">Farm AG002, Moiben</p>
        </header>

        <main className="report-content">
          <section className="report-section">
            <h2>Purpose of Visit</h2>
            <p>
              To assess the potential of Farm AG002 for setting up a dairy farm
              with a capacity of up to 15 animals.
            </p>
          </section>

          <section className="report-section">
            <h2>Key Observations</h2>
            <ul>
              <li>
                <strong>Livestock Health:</strong> Three cattle observed on free
                range, one tethered. Signs of blue ticks and rough fur indicating
                internal parasite infestation.
              </li>
              <li>Animals lacked identification tags.</li>
              <li>Dorper sheep of good breed present.</li>
              <li>Sheep shed is in poor condition, exposing animals to risks.</li>

              <li>
                <strong>Water Supply:</strong> A reliable water source was available
                for the livestock, but the watering points need to be upgraded to
                accommodate more animals.
              </li>
              <li>
                <strong>Waste Management:</strong> Poor waste management practices
                observed, with waste accumulated around the sheep shed. This could
                lead to health issues if not addressed.
              </li>
              <li>
                <strong>Fencing:</strong> The perimeter fence is in good condition,
                but additional space for milking areas is needed.
              </li>
              <li>
                <strong>Infrastructure:</strong> Renovate the dairy shed roof, feeding area, and build a proper sleeping area. Repair the sheep shed to ensure animal safety.
              </li>
            </ul>

            <div className="image-gallery">
              <img src={image1} alt="Livestock Health" className="report-image" />
              <img src={image2} alt="Sheep Shed Condition" className="report-image" />
              <img src={image3} alt="Pasture Condition" className="report-image" />
              <img src={image4} alt="Water Supply" className="report-image" />
              <img src={image5} alt="Waste Management" className="report-image" />
              <img src={image6} alt="Waste Management" className="report-image" />
            </div>
          </section>

          <section className="report-section">
            <h2>Recommendations</h2>
            <ul>
              <li>Dehorn and deworm cattle.</li>
              <li>Implement a tagging system for livestock.</li>
              <li>Renovate dairy and sheep sheds.</li>
              <li>Enhance management practices with surveillance systems.</li>
              <li>Establish a robust management system to optimize operations.</li>
              <li>Introduce surveillance systems, such as CCTV, for better management and security.</li>
              <li>Upgrade watering points to cater for more animals.</li>
              <li>Set up an area for milking</li>
              <li>Repair and expand the dairy shed to accommodate the proposed herd size and ensure efficient milking.</li>
              <li>Properly arrange feeds in the store for efficient record-keeping.</li>
              <li>Capitalize on the high-yielding cow by enhancing its feeding program to boost production.</li>
            </ul>
          </section>

          <section className="report-section">
            <h2>Any Other Business (AOB)</h2>
            <ul>
            The horticulture farm requires more attention, which can be addressed with improved surveillance and a vibrant management team.            </ul>
          </section>

          <section className="report-section">
            <h2>Conclusion</h2>
            <ul>
              Farm AG002 in Moiben shows great potential for developing a dairy farm with proper infrastructure upgrades, enhanced management practices, and a focus on livestock health and care. Addressing the challenges and implementing the recommendations will set a solid foundation for a thriving farm operation.
            </ul>
          </section>
        </main>

        <footer className="report-footer">
          <button onClick={downloadPDF} className="btn btn-primary">
            Download Full Report (PDF)
          </button>
          <p>© {new Date().getFullYear()} Agrieldo - Enhancing Farm Management</p>
        </footer>
      </div>
    );
  }

  // If not authenticated, show the code entry form
  return (
    <div className="access-code-page">
      <h2>Enter Access Code</h2>
      <form onSubmit={handleCodeSubmit}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter the code"
        />
        <button type="submit">Submit</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default FieldTripReport;
