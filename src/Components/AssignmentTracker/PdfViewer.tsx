import React, { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import { Button, Empty, Input, Spin } from "antd";
import { CloseCircleTwoTone } from "@ant-design/icons";
import "./PdfViewer.css";
import type { GetProps } from "antd";
import { Colors } from "../../constants/constantsUi";

interface PdfViewerProps {
  file: string; // Path to the PDF file
  setPages: (numPages: number | null) => void; // Callback to set total pages
  initialPage?: number; // Optional initial page number
  hideButtons?: boolean;
}
type SearchProps = GetProps<typeof Input.Search>;

const PdfViewer: React.FC<PdfViewerProps> = ({
  file,
  setPages,
  initialPage = undefined,
  hideButtons = false,
}) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(initialPage || 1); // Set to initialPage if provided
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { Search } = Input;

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
    console.log("entered");
  };

  const onDocumentLoadError = (error: any) => {
    setError("Failed to load PDF: " + error.message);
    setLoading(false);
    console.log("entered error");
  };

  useEffect(() => {
    setPages(numPages);
  }, [numPages, setPages]);

  useEffect(() => {
    console.log("initialPage:::", initialPage);
    if (initialPage !== undefined) {
      setPageNumber(initialPage);
    }
  }, [initialPage]);
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
    const val = Number(value);
    if (val === 0) {
      setPageNumber(1);
    } else if (val > Number(numPages)) {
      setPageNumber(Number(numPages));
    } else setPageNumber(val);
  };

  return (
    <div className="containerPdf">
      <Document
        className={"document-class"}
        file={{ url: file }}
        onLoadSuccess={onDocumentLoadSuccess}
        renderMode="canvas"
        noData={<Empty />}
        loading={<Spin tip="Loading" size="large"></Spin>}
      >
        <Page
          pageNumber={pageNumber}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          className={"canvas_react-pdf"}
        />
      </Document>

      {!hideButtons && (
        <div className="pdfButtons">
          <p className="textP">
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </p>
          <Search
            placeholder="Page"
            allowClear={{
              clearIcon: (
                <CloseCircleTwoTone twoToneColor={Colors.primaryColor} />
              ),
            }}
            enterButton
            size="large"
            style={{ width: 150, color: Colors.blackBG }}
            onSearch={onSearch}
          />
         <Button
  disabled={pageNumber === 1}
  size="large"
  type="primary"
  className="buttonPdf"
  onClick={() => setPageNumber(pageNumber - 1)}
>
  {"<"} {/* Previous button */}
</Button>

<Button
  disabled={numPages === pageNumber}
  size="large"
  type="primary"
  className="buttonPdf"
  onClick={() => setPageNumber(pageNumber + 1)}
>
  {">"} {/* Next button */}
</Button>

{/* Up Button */}
<Button
  disabled={pageNumber === 1}
  size="large"
  type="primary"
  className="buttonPdf"
  onClick={() => setPageNumber(pageNumber - 1)} // Adjust the logic for "Up"
>
  {"↑"} {/* Up button */}
</Button>

{/* Down Button */}
<Button
  disabled={numPages === pageNumber}
  size="large"
  type="primary"
  className="buttonPdf"
  onClick={() => setPageNumber(pageNumber + 1)} // Adjust the logic for "Down"
>
  {"↓"} {/* Down button */}
</Button>


                </div>
              )}
            </div>
  );
};

export default PdfViewer;
