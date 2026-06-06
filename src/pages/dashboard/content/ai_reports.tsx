import { reports_ai } from "@/api/reports";
import { Button, Input, Spin, Table } from "@/components";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BiSearchAlt2 } from "react-icons/bi";
import { Form } from "react-router";
import { AI } from "@/icons";

/**
 * AI Reports
 * @example
 * return <AIReports />
*/
const AIReports: React.FC = () => {
  const [ columns, setColumns ] = useState([]);
  const [ data, setData ] = useState([]);

  const methods = useForm();
  const submit = useMutation({
    mutationKey: [ "ai", "query" ],
    mutationFn: async (data) => {
      setColumns([]);
      setData([]);
      const response = await reports_ai(data);
      return response;
    },
    onSuccess: (data) => {
      const columns = Object.keys(data?.result?.[0]);
      setData(data?.result);
      setColumns(columns?.map(item => ({
        title: item,
        dataIndex: item
      })));
    }
  });

  return (
    <div className="flex flex-col gap-4 w-full">
      <FormProvider {...methods}>
        <Form
          onSubmit={methods.handleSubmit((data) => submit.mutate(data))}
        >
          <div className="flex flex-col items-center w-full">
            
            <div className="flex gap-4 items-center w-full">
              <Input
                {...methods.register("comment")}
                disabled={submit?.isPending}
              />
              <Button
                variant="primary"
                htmlType="submit"
                disabled={submit?.isPending}
              >
                <BiSearchAlt2 />
              </Button>
            </div>
          </div>
        </Form>
        <Spin
          logo={AI}
          loading={submit?.isPending}
        >
          <Table
            columns={columns}
            data={data}
          />
        </Spin>
      </FormProvider>
    </div>
  );
}

export default AIReports;