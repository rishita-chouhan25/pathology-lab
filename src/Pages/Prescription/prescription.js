import React from 'react'
import imgLogo from '../../assets/pathologyLogo.jpg1.jpg'
import './prescription.css'
import html2canvas from 'html2canvas'
import jspdf from 'jspdf';
const Prescription = () => {

    const downLoadPDF = () => {

        const input  = document.getElementById("pdfDownload");

    html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf();
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth)/ canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`name.pdf`);
    });
    // Navigate('/');
    };
  return (
    <div className="Prescription">
        <div className="presdownload" id='pdfDownload'>
            <div className="header-logos">
                <img className='pathoimg' src={imgLogo} alt="presc-logo" />
                <div className="pathologyDesc">
                    <div className="namePathology">Zoho Pathology</div>
                     <div className="addressDetails">Near Infosys, Hinjewadi Phase 2</div>
                     <div className="mobno">+91-7728796580</div>
                </div>

            </div>
            <div className="patient-info">
                <div className="patient-info-row">
                    <div className="info-detail">
                        <div className="patient-name-attr">Name : </div>
                        <div className="patient-name-value">{"patient Name"}</div>
                    </div>
                    <div className="info-detail-age">
                        <div className="patient-name-attr"> Age : </div>
                        <div className="patient-name-value">{"patient Age"}</div>
                    </div>
                    <div className="info-detail">
                        <div className="patient-name-attr">Address : </div>
                        <div className="patient-name-value">{" patient Address "}</div>
                    </div>
                </div>
                <div className="patient-info-row">
                    <div className="info-detail">
                        <div className="patient-name-attr">Examined By : </div>
                        <div className="patient-name-value">{" patient Examined By "}</div>
                    </div>
                    <div className="info-detail-age">
                        <div className="patient-name-attr"> MobNo : </div>
                        <div className="patient-name-value">{" patient Mobile no "}</div>
                    </div>
                    <div className="info-detail">
                        <div className="patient-name-attr">Examined Date: </div>
                        <div className="patient-name-value">{" patient Examined Date "}</div>
                    </div>
                </div>

            </div>
            <div className="result-section">
                <div className="particular-test">
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Normal Range</th>
                                <th>Unit</th>
                                <th>Result</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr className='finalPrescriptionRow'>
                                <td>{"test 1"}</td>
                                <td>{"89-100"}</td>
                                <td>{"Ml"}</td>
                                <td>{"95"}</td>

                            </tr>
                        </tbody>

                    </table>
                    <div className="footer-prescription">
                        <div className="examinedBy">
                            <div className="signature">
                                <div>Examined By</div>
                                <div>Dr Naveen Sharma</div>
                            </div>
                            <div className="signature">
                                <div>Report Date</div>
                                <div>{"Report Date"}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="pdf-down-btn" onClick={downLoadPDF}>
            Download
        </div>
    </div>
  )
}

export default Prescription