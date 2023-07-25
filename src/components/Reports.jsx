import React from 'react'

const Reports = () => {
  return (
    <main className="main-container">
    <div className="main-title">
      <h2>DASHBOARD</h2>
    </div>

    <div className="main-cards">

      <div className="card">
        <div className="card-inner">
          <h3>PERSONS</h3>
          <span className="material-icons-outlined">inventory_2</span>
        </div>
        <h1>249</h1>
      </div>

      <div className="card">
        <div className="card-inner">
          <h3>CATEGORIES</h3>
          <span className="material-icons-outlined">category</span>
        </div>
        <h1>0</h1>
      </div>

      <div className="card">
        <div className="card-inner">
          <h3>CUSTOMERS</h3>
          <span className="material-icons-outlined">groups</span>
        </div>
        <h1>0</h1>
      </div>

      <div className="card">
        <div className="card-inner">
          <h3>ALERTS</h3>
          <span className="material-icons-outlined">notification_important</span>
        </div>
        <h1>0</h1>
      </div>

    </div>

    <div className="charts">

      <div className="charts-card">
        <h2 className="chart-title">Top 5 Products</h2>
        <div id="bar-chart"></div>
      </div>

      <div className="charts-card">
        <h2 className="chart-title">Purchase and Sales Orders</h2>
        <div id="area-chart"></div>
      </div>

    </div>
  </main>
  )
}

export default Reports