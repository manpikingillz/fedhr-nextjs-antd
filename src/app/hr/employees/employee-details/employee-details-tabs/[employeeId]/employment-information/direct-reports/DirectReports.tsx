import { useQuery } from '@tanstack/react-query';
import { DirectReportEmployeeData } from './types';
import { getDirectReportsListApi } from './api';
import { useParams } from 'next/navigation';
import { List } from 'antd';
import { ErrorMessage } from '@/app/error/errorPage';
import Link from 'next/link';

const DirectReports = () => {
  const params = useParams();

  const {
    data: directReportsList,
    error: errorDirectReportsList,
    isFetching: isFetchingDirectReportsList,
    isLoading: isLoadingDirectReportsList,
    status: statusDirectReportsList,
  } = useQuery<DirectReportEmployeeData[]>({
    queryKey: ['direct-reports-list', params.employeeId],
    queryFn: () => getDirectReportsListApi(parseInt(params.employeeId)),
  });

  return (
    <>
      {errorDirectReportsList ? (
        <ErrorMessage error={errorDirectReportsList} />
      ) : (
        <List
          size="small"
          dataSource={directReportsList}
          renderItem={(directReport) => (
            <List.Item>
              <Link
                href={`/hr/employees/employee-details/employee-details-tabs/${directReport.id}/employment-information`}
              >
                {directReport.first_name + ' ' + directReport.last_name}
              </Link>
            </List.Item>
          )}
          loading={isFetchingDirectReportsList || isLoadingDirectReportsList}
          locale={{ emptyText: 'No direct reports' }}
        />
      )}
    </>
  );
};

export default DirectReports;
