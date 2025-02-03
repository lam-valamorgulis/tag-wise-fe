import ValidationResults, { ValidationData } from "./ValidationResults";

interface RuleValidationDetailProps {
  ruleValidationResult: ValidationData;
}

function RuleValidationDetail({
  ruleValidationResult,
}: RuleValidationDetailProps) {
  console.log("Rule Validation Result:", ruleValidationResult);
  if (!ruleValidationResult) return <p>click Validate to audit rule</p>;

  return (
    <>
      <ValidationResults ruleValidationResult={ruleValidationResult} />
    </>
  );
}

export default RuleValidationDetail;
