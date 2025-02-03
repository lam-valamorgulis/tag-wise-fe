/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export interface ValidationData {
  checkName: {
    isValid: boolean;
    components: {
      userType: string;
      siteSection: string;
      purpose: string;
      trackingPage: string;
      trackingFeature: string;
    };
    valideName: {
      userType: string;
      siteSection: string;
      purpose: string;
      trackingPage: string;
      trackingFeature: string;
    };
  };
  checkEvents: {
    checkWindowLoad: {
      isRuleContainWL: boolean;
      eventComponents: string[];
      validComponents: {
        isValid: boolean;
        reason: string;
      }[];
      totalChecked: number;
    };
    checkRuleOrder: {
      checkComponents: {
        isValid: boolean;
        reason: string;
      }[];
      totalChecked: number;
    };
    checkCookiesEvent: {
      validatedComponents: {
        isValid: boolean;
        reason: string;
      }[];
      totalChecked: number;
    };
  };
  checkCondition: {
    checkDateRange: {
      isContainDateRange: boolean;
      validComponents: {
        id: string;
        isContainDateRange: boolean;
        name: string;
        endDate: string;
        isValid: boolean;
        maxAllowedDate: string;
        reason: string;
      }[];
      invalidComponents: any[];
      totalChecked: number;
    };
    checkPathString: {
      isContainQueryPath: boolean;
      validComponents: any[];
      invalidComponents: any[];
      totalChecked: number;
      bypassedComponents: {
        isValid: boolean;
        reason: string;
      }[];
    };
    checkCookiesCondition: {
      validComponents: any[];
      invalidComponents: {
        isValid: boolean;
        reason: string;
      }[];
      bypassedComponents: any[];
      totalChecked: number;
    };
  };
  checkActions: {
    checkActions: {
      validComponents: {
        id: string;
        isValid: boolean;
        reason: string;
      }[];
      totalChecked: number;
    };
  };
}

interface ValidationResultsProps {
  ruleValidationResult: ValidationData;
}

const ValidationResults: React.FC<ValidationResultsProps> = ({
  ruleValidationResult,
}) => {
  const { checkName, checkEvents, checkCondition, checkActions } =
    ruleValidationResult;

  // Common styles
  const containerStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "5px",
    padding: "5px",
    fontFamily: "monospace",
    fontSize: "10px",
    backgroundColor: "#f0f0f0",
  };

  const sectionStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    borderRadius: "3px",
    padding: "5px",
    margin: "2px",
    border: "1px solid #ddd",
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: "10px",
    fontWeight: "bold",
    color: "#333",
    margin: "0 0 5px 0",
    padding: "3px",
    // backgroundColor: "#e0e0e0",
    fontFamily: "monospace",
  };

  const testCaseStyle: React.CSSProperties = {
    fontSize: "10px",
    color: "#333",
    margin: "3px 0",
    padding: "3px",
    fontFamily: "monospace",
  };

  const subHeaderStyle: React.CSSProperties = {
    fontSize: "10px",
    fontWeight: "bold",
    color: "#444",
    margin: "5px 0 3px 0",
    fontFamily: "monospace",
  };

  const renderStatus = (isValid?: boolean) => (
    <span
      style={{
        color: isValid ? "#090" : "#900",
        marginLeft: "4px",
        fontSize: "10px",
        fontFamily: "monospace",
      }}
    >
      {isValid ? "✓ PASS" : "✗ FAIL"}
    </span>
  );

  return (
    <div style={containerStyle}>
      {/* Column 1: Check Name */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>I. Check Name</h3>
        <div style={testCaseStyle}>
          <p>
            Rule Name start with (LC):
            {renderStatus(checkName?.valideName?.userType === "pass")}
          </p>
          <p>
            Site Section contains {checkName?.components?.siteSection}:
            {renderStatus(checkName?.valideName?.siteSection === "pass")}
          </p>
          <p>Purpose: {checkName?.components?.purpose}</p>
          <p>Tracking Page: {checkName?.components?.trackingPage}</p>
          <p>Tracking Feature: {checkName?.components?.trackingFeature}</p>
        </div>
      </div>

      {/* Column 2: Check Events */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>II. Check Events</h3>
        <div style={testCaseStyle}>
          <h4 style={subHeaderStyle}>a. Check Window Load</h4>
          <p>
            Rules does not contains WL:
            {renderStatus(!checkEvents?.checkWindowLoad?.isRuleContainWL)}
          </p>
          <p>
            Events: {checkEvents?.checkWindowLoad?.eventComponents?.join(", ")}
          </p>

          <h4 style={subHeaderStyle}>b. Check Rule Order</h4>
          <p>
            All is greater than 50:{" "}
            {renderStatus(
              checkEvents?.checkRuleOrder?.checkComponents?.[0]?.isValid
            )}
          </p>

          <h4 style={subHeaderStyle}>c. Check Consent Mode</h4>
          <p>
            {checkEvents?.checkCookiesEvent?.validatedComponents?.[0]?.reason} :
            {renderStatus(
              checkEvents?.checkCookiesEvent?.validatedComponents?.[0]?.isValid
            )}
          </p>
        </div>
      </div>

      {/* Column 3: Check Conditions */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>III. Check Conditions</h3>
        <div style={testCaseStyle}>
          <h4 style={subHeaderStyle}>a. Check Date Range</h4>
          <p>
            Is Rule contains a date range
            {renderStatus(checkCondition?.checkDateRange?.isContainDateRange)}
          </p>
          {checkCondition?.checkDateRange?.validComponents?.map((comp, i) => (
            <div key={i}>
              <p>
                {comp?.reason} :{renderStatus(comp?.isValid)}
              </p>
              <p>
                Rule will end before:{" "}
                {new Date(comp.endDate).toLocaleDateString()}
              </p>
              <p>
                Max date range allowed:{" "}
                {new Date(comp.maxAllowedDate).toLocaleDateString()}
              </p>
            </div>
          ))}

          {checkCondition?.checkDateRange?.invalidComponents &&
            Array.isArray(checkCondition.checkDateRange.invalidComponents) &&
            checkCondition.checkDateRange.invalidComponents.length > 0 &&
            checkCondition.checkDateRange.invalidComponents.map((comp, i) => (
              <p key={i}>
                {comp?.reason ?? "No reason provided"}:{" "}
                {renderStatus(!!comp?.isValid)}
              </p>
            ))}

          <h4 style={subHeaderStyle}>b. Check Path & Query String</h4>
          <p>
            Is Rule contains Condition a path and query string:
            {renderStatus(checkCondition?.checkPathString?.isContainQueryPath)}
          </p>
          {checkCondition?.checkPathString?.validComponents?.length > 0 &&
            checkCondition.checkPathString.validComponents.map((comp, i) => (
              <p key={`valid-path-${i}`}>
                {comp?.reason}: {renderStatus(comp?.isValid)}
              </p>
            ))}
          {checkCondition?.checkPathString?.invalidComponents?.length > 0 &&
            checkCondition.checkPathString.invalidComponents.map((comp, i) => (
              <p key={`invalid-path-${i}`} style={{ color: "#900" }}>
                {comp?.reason}: {renderStatus(comp?.isValid)}
              </p>
            ))}
          {checkCondition?.checkPathString?.bypassedComponents?.map(
            (comp, i) => (
              <p key={i}>
                {comp?.reason} :{renderStatus(comp?.isValid)}
              </p>
            )
          )}

          <h4 style={subHeaderStyle}>c. Check Cookies Condition</h4>
          {checkCondition?.checkCookiesCondition?.validComponents?.length > 0 &&
            checkCondition.checkCookiesCondition.validComponents.map(
              (comp, i) => (
                <div key={`valid-cookie-${i}`} style={{ color: "#090" }}>
                  {comp?.reason}: {renderStatus(comp?.isValid)}
                </div>
              )
            )}
          {checkCondition?.checkCookiesCondition?.invalidComponents?.map(
            (comp, i) => (
              <div key={i} style={{ color: "#900" }}>
                {comp.reason}
              </div>
            )
          )}
          {checkCondition?.checkCookiesCondition?.bypassedComponents?.map(
            (comp, i) => (
              <p key={i}>
                {comp?.reason} :{renderStatus(comp?.isValid)}
              </p>
            )
          )}
        </div>
      </div>

      {/* Column 4: Check Actions */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>IV. Check Actions</h3>
        <div style={testCaseStyle}>
          {checkActions?.checkActions?.validComponents?.map((comp, i) => (
            <p key={i}>
              Is Local rule implemented in Custom Code:
              {renderStatus(comp?.isValid)}
            </p>
          ))}
          {checkActions?.checkActions?.validComponents?.map((action, i) => (
            <div key={i}>
              <p key={i}>
                {action?.reason} :{renderStatus(action?.isValid)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValidationResults;

// const ValidationResults: React.FC<ValidationResultsProps> = ({
//   ruleValidationResult,
// }) => {
//   const { checkName, checkEvents, checkCondition, checkActions } =
//     ruleValidationResult;

//   console.log(checkActions, 102);

//   // Helper function to render validation status
//   const renderStatus = (isValid?: boolean) => (
//     <span style={{ color: isValid ? "green" : "red", marginLeft: "8px" }}>
//       {isValid ? "✓ PASS" : "✗ FAIL"}
//     </span>
//   );

//   return (
//     <div
//       style={{
//         display: "grid",
//         gridTemplateColumns: "repeat(4, 1fr)",
//         gap: "5px",
//         padding: "5px",
//         fontFamily: "Arial, sans-serif",
//       }}
//     >
//       {/* Column 1: Check Name */}
//       <div style={sectionStyle}>
//         <h3>I. Check Name</h3>
//         <p>
//           Rule Name start with (LC):
//           {renderStatus(checkName?.valideName?.userType === "pass")}
//         </p>
//         <p>
//           Site Section contains {checkName?.components?.siteSection}:
//           {renderStatus(checkName?.valideName?.siteSection === "pass")}
//         </p>
//         <p>Purpose: {checkName?.components?.purpose}</p>
//         <p>Tracking Page: {checkName?.components?.trackingPage}</p>
//         <p>Tracking Feature: {checkName?.components?.trackingFeature}</p>
//       </div>

//       {/* Column 2: Check Events */}
//       <div style={sectionStyle}>
//         <h3>II. Check Events</h3>
//         <h4>a. Check Window Load: </h4>
//         <p>
//           Rules does not contains WL:
//           {renderStatus(!checkEvents?.checkWindowLoad?.isRuleContainWL)}
//         </p>
//         <p>
//           Events: {checkEvents?.checkWindowLoad?.eventComponents?.join(", ")}
//         </p>

//         <h4>b. Check Rule Order: </h4>
//         <p>
//           All is greater than 50:{" "}
//           {renderStatus(
//             checkEvents?.checkRuleOrder?.checkComponents?.[0]?.isValid
//           )}
//         </p>

//         <h4>c. Check Consent Mode: </h4>
//         <p>
//           {checkEvents?.checkCookiesEvent?.validatedComponents?.[0]?.reason} :
//           {renderStatus(
//             checkEvents?.checkCookiesEvent?.validatedComponents?.[0]?.isValid
//           )}
//         </p>
//       </div>

//       <div style={sectionStyle}>
//         <h3>III. Check Conditions</h3>

//         <h4>a.Check Date Range</h4>
//         <p>
//           Is Rule contains a date range
//           {renderStatus(checkCondition?.checkDateRange?.isContainDateRange)}
//         </p>
//         {checkCondition?.checkDateRange?.validComponents?.map((comp, i) => (
//           <div key={i}>
//             <p>
//               {comp?.reason} :{renderStatus(comp?.isValid)}
//             </p>
//             <p>
//               Rule will end before:{" "}
//               {new Date(comp.endDate).toLocaleDateString()}
//             </p>
//             <p>
//               Max date range allowed:{" "}
//               {new Date(comp.maxAllowedDate).toLocaleDateString()}
//             </p>
//           </div>
//         ))}

//         {checkCondition?.checkDateRange?.invalidComponents &&
//           Array.isArray(checkCondition.checkDateRange.invalidComponents) &&
//           checkCondition.checkDateRange.invalidComponents.length > 0 &&
//           checkCondition.checkDateRange.invalidComponents.map((comp, i) => (
//             <p key={i}>
//               {comp?.reason ?? "No reason provided"}:{" "}
//               {renderStatus(!!comp?.isValid)}
//             </p>
//           ))}

//         <h4>b. Check Path & Query String: </h4>
//         <p>
//           Is Rule contains Condition a path and query string:
//           {renderStatus(checkCondition?.checkPathString?.isContainQueryPath)}
//         </p>
//         {/* Added valid path components */}
//         {checkCondition?.checkPathString?.validComponents?.length > 0 &&
//           checkCondition.checkPathString.validComponents.map((comp, i) => (
//             <p key={`valid-path-${i}`}>
//               {comp?.reason}: {renderStatus(comp?.isValid)}
//             </p>
//           ))}
//         {/* Added invalid path components */}
//         {checkCondition?.checkPathString?.invalidComponents?.length > 0 &&
//           checkCondition.checkPathString.invalidComponents.map((comp, i) => (
//             <p key={`invalid-path-${i}`} style={{ color: "red" }}>
//               {comp?.reason}: {renderStatus(comp?.isValid)}
//             </p>
//           ))}
//         {/* Existing bypassed components */}
//         {checkCondition?.checkPathString?.bypassedComponents?.map((comp, i) => (
//           <p key={i}>
//             {comp?.reason} :{renderStatus(comp?.isValid)}
//           </p>
//         ))}

//         <h4>c. Check cookies Condition</h4>
//         {/* Added valid cookies components */}
//         {checkCondition?.checkCookiesCondition?.validComponents?.length > 0 &&
//           checkCondition.checkCookiesCondition.validComponents.map(
//             (comp, i) => (
//               <div key={`valid-cookie-${i}`} style={{ color: "green" }}>
//                 {comp?.reason}: {renderStatus(comp?.isValid)}
//               </div>
//             )
//           )}
//         {/* Existing invalid cookies components */}
//         {checkCondition?.checkCookiesCondition?.invalidComponents?.map(
//           (comp, i) => (
//             <div key={i} style={{ color: "red" }}>
//               {comp.reason}
//             </div>
//           )
//         )}
//         {/* Existing bypassed components */}
//         {checkCondition?.checkCookiesCondition?.bypassedComponents?.map(
//           (comp, i) => (
//             <p key={i}>
//               {comp?.reason} :{renderStatus(comp?.isValid)}
//             </p>
//           )
//         )}
//       </div>

//       {/* Column 4: Check Actions */}
//       <div style={sectionStyle}>
//         <h3>IV. Check Actions</h3>
//         {checkActions?.checkActions?.validComponents?.map((comp, i) => (
//           <p key={i}>
//             Is Local rule implemented in Custom Code:
//             {renderStatus(comp?.isValid)}
//           </p>
//         ))}
//         {checkActions?.checkActions?.validComponents?.map((action, i) => (
//           <div key={i}>
//             <p key={i}>
//               {action?.reason} :{renderStatus(action?.isValid)}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Common style for sections
// const sectionStyle: React.CSSProperties = {
//   backgroundColor: "#f5f5f5",
//   borderRadius: "8px",
// };

// export default ValidationResults;
