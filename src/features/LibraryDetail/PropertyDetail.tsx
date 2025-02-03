import { Col, Row } from "antd";
import type { PropertyDetail } from "./useProperty";

function PropertyDetail({
  propertyDetail,
}: {
  propertyDetail: PropertyDetail;
}) {
  return (
    <Row className="h-full">
      <Col xs={24} sm={12} className="border-r pr-4">
        <Row className="border-b border-gray-200 h-10" align={"middle"}>
          <Col span={8}>Subsidinary</Col>
          <Col span={16}>{propertyDetail.subHq}</Col>
        </Row>
        <Row className="border-b border-gray-200 h-10" align={"middle"}>
          <Col span={8}>Site code</Col>
          <Col span={16}>{propertyDetail.site_code}</Col>
        </Row>
        <Row className="border-b border-gray-200 h-10" align={"middle"}>
          <Col span={8}>Shop Type</Col>
          <Col span={16}>{propertyDetail.shopType}</Col>
        </Row>
      </Col>
      <Col xs={24} sm={12} className="border-r px-4">
        <Row className="border-b border-gray-200 h-10" align={"middle"}>
          <Col span={8}> URL</Col>
          <Col span={16}>
            <a
              href={propertyDetail.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {propertyDetail.url}
            </a>
          </Col>
        </Row>
        <Row className="border-b border-gray-200 h-10" align={"middle"}>
          <Col span={8}>rHQ</Col>
          <Col span={16}>{propertyDetail.rhq}</Col>
        </Row>
        <Row className=" h-10" align={"middle"}>
          <Col span={8}>Country</Col>
          <Col span={16}>{propertyDetail.country}</Col>
        </Row>
        <Row className=" h-10" align={"middle"}>
          <Col span={8}>Region</Col>
          <Col span={16}>Region</Col>
        </Row>
      </Col>
    </Row>
  );
}

export default PropertyDetail;
