/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export interface ValidationData {
  checkName?: {
    isValid?: boolean;
    components?: {
      userType?: string;
      siteSection?: string;
      purpose?: string;
      trackingPage?: string;
      trackingFeature?: string;
    };
    valideName?: {
      userType?: string;
      siteSection?: string;
      purpose?: string;
      trackingPage?: string;
      trackingFeature?: string;
    };
  };
  checkEvents?: {
    checkWindowLoad?: {
      isRuleContainWL?: boolean;
      eventComponents?: string[];
      invalidComponents?: {
        isValid?: boolean;
        reason?: string;
      }[];
      validComponents?: {
        isValid?: boolean;
        reason?: string;
      }[];
      totalChecked?: number;
    };
    checkRuleOrder?: {
      checkComponents?: {
        isValid?: boolean;
        reason?: string;
      }[];
      totalChecked?: number;
    };
    checkCookiesEvent?: {
      eventComponents?: string[];
      validatedComponents?: {
        isValid?: boolean;
        reason?: string;
      }[];
      totalChecked?: number;
    };
  };
  checkCondition?: {
    checkDateRange?: {
      isContainDateRange?: boolean;
      validComponents?: {
        id?: string;
        isContainDateRange?: boolean;
        name?: string;
        endDate?: string;
        isValid?: boolean;
        maxAllowedDate?: string;
        reason?: string;
      }[];
      invalidComponents?: any[];
      totalChecked?: number;
    };
    checkPathString?: {
      isContainQueryPath?: boolean;
      conditionElement?: string[];
      validComponents?: any[];
      invalidComponents?: any[];
      totalChecked?: number;
      bypassedComponents?: {
        isValid?: boolean;
        reason?: string;
      }[];
    };
    checkCookiesCondition?: {
      validComponents?: any[];
      invalidComponents?: {
        isValid?: boolean;
        reason?: string;
      }[];
      bypassedComponents?: any[];
      totalChecked?: number;
    };
  };
  checkActions?: {
    checkActions?: {
      isImplementedByCustomCode?: boolean;
      validComponents?: {
        id?: string;
        isValid?: boolean;
        reason?: string;
      }[];
      totalChecked?: number;
    };
  };
}

interface ValidationResultsProps {
  ruleValidationResult?: ValidationData;
}

const ValidationResults: React.FC<ValidationResultsProps> = ({
  ruleValidationResult,
}) => {
  const { checkName, checkEvents, checkCondition, checkActions } =
    ruleValidationResult ?? {};

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
            • Rule Name start with (LC):{" "}
            {renderStatus(checkName?.valideName?.userType === "pass")}
          </p>
          <p>
            • Site Section contains{" "}
            {checkName?.components?.siteSection ?? "N/A"}:{" "}
            {renderStatus(checkName?.valideName?.siteSection === "pass")}
          </p>
          <p>• Purpose: {checkName?.components?.purpose ?? "N/A"}</p>
          <p>• Tracking Page: {checkName?.components?.trackingPage ?? "N/A"}</p>
          <p>
            • Tracking Feature:{" "}
            {checkName?.components?.trackingFeature ?? "N/A"}
          </p>
        </div>
      </div>

      {/* Column 2: Check Events */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>II. Check Events</h3>
        <div style={testCaseStyle}>
          <h4 style={subHeaderStyle}>a. Check Window Load</h4>
          <p>
            • Rules contains WL:{" "}
            {renderStatus(checkEvents?.checkWindowLoad?.isRuleContainWL)}
          </p>
          <p>
            • Events:{" "}
            {checkEvents?.checkWindowLoad?.eventComponents?.join(", ") ?? "N/A"}
          </p>

          <h4 style={subHeaderStyle}>b. Check Data Element Change</h4>
          {checkEvents?.checkWindowLoad?.invalidComponents?.map((comp, i) => (
            <div key={i}>
              <p>
                • {comp?.reason ?? "No reason provided"} :{" "}
                {renderStatus(comp?.isValid)}
              </p>
            </div>
          ))}

          {checkEvents?.checkWindowLoad?.validComponents?.map((comp, i) => (
            <div key={i}>
              <p>
                • {comp?.reason ?? "No reason provided"} :{" "}
                {renderStatus(comp?.isValid)}
              </p>
            </div>
          ))}

          <h4 style={subHeaderStyle}>c. Check Rule Order</h4>
          <p>
            • All is greater than 50:{" "}
            {renderStatus(
              checkEvents?.checkRuleOrder?.checkComponents?.[0]?.isValid
            )}
          </p>

          <h4 style={subHeaderStyle}>d. Check Consent Mode</h4>
          <p>
            •{" "}
            {checkEvents?.checkCookiesEvent?.validatedComponents?.[0]?.reason ??
              "No reason provided"}{" "}
            :{" "}
            {renderStatus(
              checkEvents?.checkCookiesEvent?.validatedComponents?.[0]?.isValid
            )}
          </p>

          <p>
            {(checkEvents?.checkCookiesEvent?.eventComponents?.length ?? 0) >
              0 && <span>• Events: </span>}
            {checkEvents?.checkCookiesEvent?.eventComponents?.join(", ") ??
              "N/A"}
          </p>
        </div>
      </div>

      {/* Column 3: Check Conditions */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>III. Check Conditions</h3>
        <div style={testCaseStyle}>
          <h4 style={subHeaderStyle}>a. Check Date Range</h4>
          <p>
            • Is Rule contains a date range{" "}
            {renderStatus(checkCondition?.checkDateRange?.isContainDateRange)}
          </p>
          {checkCondition?.checkDateRange?.validComponents?.map((comp, i) => (
            <div key={i}>
              <p>
                • {comp?.reason ?? "No reason provided"} :{" "}
                {renderStatus(comp?.isValid)}
              </p>
              <p>
                • Rule will end before:{" "}
                {comp?.endDate
                  ? new Date(comp.endDate).toLocaleDateString()
                  : "N/A"}
              </p>
              <p>
                • Max date range allowed:{" "}
                {comp?.maxAllowedDate
                  ? new Date(comp.maxAllowedDate).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          ))}

          {checkCondition?.checkDateRange?.invalidComponents?.map((comp, i) => (
            <p key={i} style={{ color: "#900" }}>
              • {comp?.reason ?? "No reason provided"}:{" "}
              {renderStatus(comp?.isValid)}
            </p>
          ))}

          <h4 style={subHeaderStyle}>b. Check Path & Query String</h4>
          <p>
            • Is Rule contains Condition a path and query string:{" "}
            {renderStatus(checkCondition?.checkPathString?.isContainQueryPath)}
          </p>

          <p>
            {(checkCondition?.checkPathString?.conditionElement?.length ?? 0) >
              0 && <span>• Condition: </span>}
            {checkCondition?.checkPathString?.conditionElement?.join(", ") ??
              "N/A"}
          </p>

          {checkCondition?.checkPathString?.validComponents?.map((comp, i) => (
            <p key={i}>
              • {comp?.reason ?? "No reason provided"}:{" "}
              {renderStatus(comp?.isValid)}
            </p>
          ))}

          {checkCondition?.checkPathString?.bypassedComponents?.map(
            (comp, i) => (
              <p key={i}>
                • {comp?.reason ?? "No reason provided"}:{" "}
                {renderStatus(comp?.isValid)}
              </p>
            )
          )}

          {checkCondition?.checkPathString?.invalidComponents?.map(
            (comp, i) => (
              <p key={i} style={{ color: "#900" }}>
                • {comp?.reason ?? "No reason provided"}:{" "}
                {renderStatus(comp?.isValid)}
              </p>
            )
          )}
        </div>
      </div>

      {/* Column 4: Check Actions */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>IV. Check Actions</h3>
        <h4 style={subHeaderStyle}>a. Check Custom code</h4>
        <div style={testCaseStyle}>
          • Is Actions implemented by Custom code:{" "}
          {renderStatus(checkActions?.checkActions?.isImplementedByCustomCode)}
        </div>

        <h4 style={subHeaderStyle}>b. Check PII</h4>
        <div style={testCaseStyle}>
          {checkActions?.checkActions?.validComponents?.map((comp, i) => (
            <p key={i}>
              • {comp?.reason ?? "No reason provided"} :{" "}
              {renderStatus(comp?.isValid)}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValidationResults;
