import React from "react";

const HorizontalTimeline = () => {
  return (
    <div className="card__wrapper">
      <div className="card__title-wrap mb-[20px]">
        <h5 className="card__heading-title">Horizontal Timeline</h5>
      </div>
      <div className="bd-timeline-wrapper">
        <div className="bd-timeline-item">
          <span className="bd-timeline-icon">
            <i className="fa fa-user-tie" />
          </span>
          <div className="border-timeline" />
          <div className="bd-timeline-content">
            <h4 className="title">Employee Onboarding</h4>
            <p className="description">
              Complete the onboarding process for new hires.
            </p>
          </div>
        </div>
        <div className="bd-timeline-item">
          <div className="bd-timeline-content">
            <h4 className="title">Training Programs</h4>
            <p className="description">
              Enroll employees in mandatory training programs.
            </p>
          </div>
          <div className="border-timeline" />
          <span className="bd-timeline-icon">
            <i className="fa fa-chalkboard-teacher" />
          </span>
        </div>
        <div className="bd-timeline-item">
          <span className="bd-timeline-icon">
            <i className="fa fa-calendar-check" />
          </span>
          <div className="border-timeline" />
          <div className="bd-timeline-content">
            <h4 className="title">Performance Reviews</h4>
            <p className="description">
              Schedule and conduct performance evaluations.
            </p>
          </div>
        </div>
        <div className="bd-timeline-item">
          <div className="bd-timeline-content">
            <h4 className="title">Employee Benefits</h4>
            <p className="description">
              Manage and update employee benefits information.
            </p>
          </div>
          <div className="border-timeline" />
          <span className="bd-timeline-icon">
            <i className="fa fa-hand-holding-usd" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default HorizontalTimeline;
