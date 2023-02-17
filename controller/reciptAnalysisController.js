const linechartModel = require(`../model/linechart`);
const piechartModel = require(`../model/piechart`);

exports.getLineCharts = async function (req, res, next) {
  try {
    const lineChart = await linechartModel.findOne({});
    /*lineChart.map((item) => {
      item.lineChart.map((lchart) => {
        if (id == lchart._id) {
          res.status(201).json({ message: "reset ready details", lineChart });
        }
      });
    });*/
    res.status(201).json({ message: "lineChart", lineChart });
  } catch (error) {
    res.status(500).json({ message: "catch error lineChart" });
  }
};

exports.getPieCharts = async function (req, res, next) {
  try {
    const pieChart = await piechartModel.findOne({});
    /*lineChart.map((item) => {
      item.lineChart.map((lchart) => {
        if (id == lchart._id) {
          res.status(201).json({ message: "reset ready details", lineChart });
        }
      });
    });*/
    res.status(201).json({ message: "pieChart  details", pieChart });
  } catch (error) {
    res.status(500).json({ message: "catch error pieChart" });
  }
};
exports.addLineCharts = async function (req, res, next) {
  try {
   
    const linechartObject = await linechartModel.insertMany({
      
      status: "ACTIVE",
      userId: req.userId,
      lineChart: req.body.lineChart,
    });
    console.log(linechartObject);
    res.status(201).json({ linechartObject, message: "linechartObject Successfully Inserted" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "catch error linechartObject" });
  }
};

exports.addPieCharts = async function (req, res, next) {
  try {
   
    const piechartObject = await piechartModel.insertMany({
      
      status: "ACTIVE",
      userId: req.userId,
      pieChart: req.body.pieChart
    });
    console.log(piechartObject);
    res.status(201).json({ piechartObject, message: "piechartObject Successfully Inserted" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "catch error piechartObject" });
  }
};

