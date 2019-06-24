import React from "react";
import { IDiveSite, Note } from "./lib/api";
import { AppContext } from "./AppContext";
import { VictoryLine, VictoryChart, VictoryAxis } from "victory";

interface IDestinationCardProps {
  site: IDiveSite;
}

class DestinationCard extends React.Component<IDestinationCardProps, any> {
  static contextType = AppContext;
  _textarea: any;

  async syncNote() {
    const diveSiteId = this.props.site.id;
    const content = await Note.getNote({ diveSiteId, user: this.context.user });
    this._textarea.value = content;
  }

  async componentWillMount() {
    if (this.context.user == null) return;
    // await this.syncNote()
  }

  async componentDidUpdate(prevProps: any) {
    // if (
    //   this.props.site != null &&
    //   prevProps.site != null &&
    //   this.props.site.id !== prevProps.site.id
    // ) {
    //   this._textarea.value = "";
      // this.syncNote()
    // }
  }

  async onNoteSave(event: any) {
    const diveSiteId = this.props.site.id;
    // TODO: check result and feedback UI
    await Note.updateNote({
      diveSiteId,
      user: this.context.user,
      content: this._textarea.value
    });
  }

  render() {
    const { site } = this.props;
    console.log(site);
    if (site == null) {
      return (
        <div>
          <h2 className="title is-two">No Dive Site Selected!</h2>
        </div>
      );
    }

    let textarea;
    if (this.context.user != null) {
      textarea = (
        <div className="full-height">
          <textarea
            autoFocus={true}
            className="textarea borderless"
            placeholder="Take notes here."
            ref={c => (this._textarea = c)}
          />
          <button className="button" onClick={this.onNoteSave.bind(this)}>
            submit
          </button>
        </div>
      );
    } else {
      textarea = (
        <div>
          <textarea
            className="textarea borderless"
            placeholder="Notes coming soon!"
            // placeholder="Please login to take notes"
            ref={c => (this._textarea = c)}
            disabled
          />
        </div>
      );
    }

    const tempData: any[] = [];
    const maxTemps: any[] = [];
    const minTemps: any[] = [];
    if (site.min_temp_by_month != null && site.max_temp_by_month != null) {
      site.min_temp_by_month.forEach((minTemp, i) => {
        // @ts-ignore
        const maxTemp = site.max_temp_by_month[i];
        tempData.push({ minTemp, maxTemp });
        maxTemps.push({ x: i, y: maxTemp });
        minTemps.push({ x: i, y: minTemp });
      });
    }

    console.log(maxTemps);
    return (
      <div>
        <h2 className="title is-two">{site.name}</h2>
        <h3 className="subtitle is-four">
          {site.city_name}, {site.country_name}
        </h3>
        <VictoryChart height={200}>
          <VictoryAxis
            tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
            tickFormat={[
              "Jan",
              "",
              "",
              "Apr.",
              "",
              "",
              "July",
              "",
              "",
              "Oct",
              "",
              ""
            ]}
          />
          <VictoryAxis
            dependentAxis
            fixLabelOverlap
            //   tickFormat={(x) => (`${x `)}
          />
          <VictoryLine data={maxTemps} x="x" y="y" />
          <VictoryLine data={minTemps} x="x" y="y" />
        </VictoryChart>
        {/* { textarea } */}
      </div>
    );
  }
}

export default DestinationCard;
