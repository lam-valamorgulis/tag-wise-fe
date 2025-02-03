import { RiseOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import { Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
// const useStyle = createStyles(({ css, token }) => {

type LibraryAttributes = {
  name: string;
  state: string;
  build_required: boolean;
};

type Library = {
  id: string;
  attributes: LibraryAttributes;
};
type PropertyAttributes = {
  name: string;
};

type Property = {
  id: string;
  attributes: PropertyAttributes;
};

export type SearchResult = {
  library?: Library;
  property?: Property;
};
interface DataType {
  key: string;
  libraryName: string;
  libraryId: string;
  propertyName: string;
  propertyId: string;
  platform: string;
  state: string;
  buildStatus: string;
  link: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Library Name",
    dataIndex: "libraryName",
    key: "libraryName",
    render: (libraryName) => <a className="text-red-600">{libraryName}</a>,
  },
  {
    title: "Library Id",
    dataIndex: "libraryId",
    key: "libraryId",
  },
  {
    title: "Property Name",
    dataIndex: "propertyName",
    key: "propertyName",
    render: (propertyName) => <a className="text-red-600">{propertyName}</a>,
  },
  {
    title: "Property Id",
    dataIndex: "propertyId",
    key: "propertyId",
  },
  {
    title: "Platform",
    dataIndex: "platform",
    key: "platform",
    render: (_, { platform }) => {
      if (platform == "AEM") {
        return (
          <>
            <Tag color="cyan" key={platform}>
              {platform.toUpperCase()}
            </Tag>
          </>
        );
      } else {
        return (
          <>
            <Tag color="blue" key={platform}>
              {platform.toUpperCase()}
            </Tag>
          </>
        );
      }
    },
  },
  {
    title: "State",
    dataIndex: "state",
    key: "state",
    render: (_, { state }) => {
      if (state == "development") {
        return (
          <>
            <Tag color="orange" key={state}>
              {state.toUpperCase()}
            </Tag>
          </>
        );
      } else {
        return (
          <>
            <Tag color="green" key={state}>
              {state.toUpperCase()}
            </Tag>
          </>
        );
      }
    },
  },
  {
    title: "Build Status",
    dataIndex: "buildStatus",
    key: "buildStatus",
    render: (_, { buildStatus }) => {
      if (buildStatus == "Required") {
        return (
          <>
            <Tag color="red-inverse" key={buildStatus}>
              {buildStatus.toUpperCase()}
            </Tag>
          </>
        );
      } else {
        return (
          <>
            <Tag color="blue" key={buildStatus}>
              {buildStatus.toUpperCase()}
            </Tag>
          </>
        );
      }
    },
  },
  {
    title: "Link Adobe",
    dataIndex: "link",
    key: "link",
    render: (text) => (
      <div className="text-center">
        <a href={text}>
          <RiseOutlined />
        </a>
      </div>
    ),
  },
];

export default function LibraryResult({
  searchLibraryResult,
}: {
  searchLibraryResult: SearchResult;
}) {
  const { library, property } = searchLibraryResult;
  const navigate = useNavigate();

  const handleNavigate = (propertyId: string, libraryId: string) => {
    navigate(`/property/${propertyId}/library/${libraryId}`);
  };

  let data: DataType[] = [];
  if (searchLibraryResult.library) {
    data = [
      {
        key: "1",
        libraryName: library?.attributes?.name ?? "",
        libraryId: library?.id ?? "",
        propertyName: property?.attributes?.name ?? "",
        propertyId: property?.id ?? "",
        platform: property?.attributes?.name.toLowerCase().includes("shop")
          ? "SHOP"
          : "AEM",
        state: library?.attributes?.state ?? "",
        buildStatus: library?.attributes?.build_required
          ? "Required"
          : "Not Required",
        link: `https://experience.adobe.com/#/@samsung/data-collection/tags/companies/COae164dc89349443cb5092e1fdc571f55/properties/${
          property?.id ?? ""
        }/publishing/${library?.id ?? ""}`,
      },
    ];
  }

  return (
    <div className="my-10 mt-20">
      <Table<DataType>
        columns={columns}
        dataSource={data}
        bordered={true}
        // scroll={{ x: 1200, y: 300 }}
        pagination={false}
        onRow={(record) => ({
          onClick: () => handleNavigate(record.propertyId, record.libraryId),
        })}
      />
    </div>
  );
}

// https://experience.adobe.com/#/@samsung/data-collection/tags/companies/COae164dc89349443cb5092e1fdc571f55/properties/PR84600eb5a4f54e4cb04858a57610ddc6/publishing/LBb0e6c723064b4119870857eaa7014700
