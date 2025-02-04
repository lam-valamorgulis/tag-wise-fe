/* eslint-disable @typescript-eslint/no-explicit-any */
import { RiseOutlined } from "@ant-design/icons";
import { Button, Col, Collapse, Row, message } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import type Options from "./Options";
import RuleValidationDetail from "./RuleValidationDetail";
import { RuleList } from "./useRule";
import { useRuleValidation } from "./useRuleValidation";

import { useEffect } from "react";

function RulesList({ rules, options }: { rules: RuleList; options: Options }) {
  const { ruleValidation, ruleValidationResult } = useRuleValidation();
  const { propertyId } = useParams<{ propertyId: string }>();
  const [activePanels, setActivePanels] = useState<string[]>([]);
  const [validationResults, setValidationResults] = useState<
    Record<string, any>
  >({});
  const [validatingRuleId, setValidatingRuleId] = useState<string | null>(null);

  const handleValidateRule = async (ruleId: string, ruleName: string) => {
    try {
      setValidatingRuleId(ruleId); // Track which rule is being validated

      await ruleValidation({ ruleId, data: { ...options, ruleName } });

      // Keep the panel open
      if (!activePanels.includes(ruleId)) {
        setActivePanels((prev) => [...prev, ruleId]);
      }

      message.success({
        content: `Validation completed for ${ruleName}`,
        key: ruleId,
      });
    } catch (error) {
      console.error("Validation Error:", error);
      message.error(`Validation failed for ${ruleName}`);
    }
  };

  // Automatically update UI when ruleValidationResult changes
  useEffect(() => {
    if (validatingRuleId && ruleValidationResult) {
      setValidationResults((prevResults) => ({
        ...prevResults,
        [validatingRuleId]:
          ruleValidationResult ?? "No validation data available",
      }));
      setValidatingRuleId(null); // Reset after storing result
    }
  }, [ruleValidationResult, validatingRuleId]);

  // Handle collapse panel change
  const handleCollapseChange = (keys: string | string[]) => {
    setActivePanels(Array.isArray(keys) ? keys : [keys]);
  };

  const collapseItems = rules.map((rule) => ({
    key: rule.id,
    label: (
      <Row
        align="middle"
        style={{
          width: "100%",
          padding: "4px 0",
          fontFamily: "monospace",
          fontSize: "10px",
          borderRadius: "3px",
          margin: "2px 0",
        }}
      >
        <Col span={6}>
          <span style={{ color: "#333", paddingLeft: "4px" }}>{rule.id}</span>
        </Col>
        <Col span={12} style={{ textAlign: "center" }}>
          <span
            style={{
              color: "#333",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {rule.name}
            <a
              href={`https://experience.adobe.com/#/@samsung/data-collection/tags/companies/COae164dc89349443cb5092e1fdc571f55/properties/${propertyId}/rules/${rule.id}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginLeft: "4px" }}
            >
              <RiseOutlined style={{ fontSize: "16px", color: "blueviolet" }} />
            </a>
          </span>
        </Col>
        <Col span={6} style={{ textAlign: "right", paddingRight: "4px" }}>
          <Button
            type="dashed"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleValidateRule(rule.id, rule.name);
            }}
            style={{
              fontSize: "10px",
              padding: "0 4px",
              margin: "0 8px",
              height: "auto",
              fontFamily: "monospace",
              borderColor: "blue",
              color: "#333",
            }}
          >
            Validate
          </Button>
        </Col>
      </Row>
    ),
    children: (
      <RuleValidationDetail
        ruleValidationResult={
          validationResults[rule.id] ?? "Click 'Validate' to check rule"
        }
      />
    ),
  }));

  return (
    <Collapse
      activeKey={activePanels}
      onChange={handleCollapseChange}
      items={collapseItems}
    />
  );
}

export default RulesList;
