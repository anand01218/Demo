import Wrapper from "@/components/layouts/DefaultWrapper";
import MetaData from "@/hooks/useMetaData";
import Link from "next/link";
import React from "react";

const ReportsPage = () => {
  return (
    <>
      <MetaData pageTitle="Reports">
        <Wrapper>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Reports</h4>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <Link
                          href="/reports/user-report"
                          className="text-decoration-none"
                        >
                          <div className="card h-100 border-primary">
                            <div className="card-body text-center">
                              <i className="fa-solid fa-users fa-3x text-primary mb-3" />
                              <h5 className="card-title">User Report</h5>
                              <p className="card-text">
                                Generate and view user-related reports
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="col-md-6 mb-3">
                        <Link
                          href="/reports/attendance-report"
                          className="text-decoration-none"
                        >
                          <div className="card h-100 border-success">
                            <div className="card-body text-center">
                              <i className="fa-solid fa-calendar-check fa-3x text-success mb-3" />
                              <h5 className="card-title">Attendance Report</h5>
                              <p className="card-text">
                                Generate and view attendance reports
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default ReportsPage;
