export function solve(tf, k01=0.1, k10=0.1, g_K=36, g_Na=120, g_L=0.3, V_K=-12, V_Na=115, V_L=10.613, C_m=1.0, Iin=10) {

  // Channel gating kinetics
  // Functions of membrane voltage
  function alpha_m(V){ return 0.1*(25-V)/(Math.exp((25.0 - V) / 10.0) - 1.0); }
  function beta_m(V){ return 4.0*Math.exp(-V / 18.0); }

  function alpha_h(V){ return 0.07*Math.exp(-V / 20.0); }
  function beta_h(V){ return 1.0 / (Math.exp((30.0 - V) / 10.0) + 1.0); }

  function alpha_n(V){ return 0.01*(10.0 - V)/(Math.exp((10.0 - V) / 10.0) - 1.0); }
  function beta_n(V){ return 0.125*Math.exp(-V / 80.0); }

  function I_Na(V,m,h){ return g_Na * m**3.0 * h * (V - V_Na); }
  function I_K(V, n){ return g_K  * n**4.0 * (V - V_K); }
  function I_L(V){ return g_L * (V - V_L); }

  function I_in(t, tf) {
    if (t < 0.1*tf) {
      return 0
    }
    else if (t < 0.9*tf) {
      return Iin
    }
    else {
      return 0
    }
  }

  function derivatives(y, t, dt, tf) {
    var [V0c, n0c, m0c, h0c, V1c, n1c, m1c, h1c] = y;
    var dVdt0 = dt * ((I_in(t, tf) - I_K(V0c, n0c) - I_Na(V0c, m0c, h0c) - I_L(V0c) - k10*(V1c - V0c)) / C_m);
    var dndt0 = dt * (alpha_n(V0c) * (1 - n0c) - beta_n(V0c) * n0c)
    var dmdt0 = dt * (alpha_m(V0c) * (1 - m0c) - beta_m(V0c) * m0c)
    var dhdt0 = dt * (alpha_h(V0c) * (1 - h0c) - beta_h(V0c) * h0c)

    var dVdt1 = dt * ((- I_K(V1c, n1c) - I_Na(V1c, m1c, h1c) - I_L(V1c) - k01*(V0c - V1c)) / C_m);
    var dndt1 = dt * (alpha_n(V1c) * (1 - n1c) - beta_n(V1c) * n1c)
    var dmdt1 = dt * (alpha_m(V1c) * (1 - m1c) - beta_m(V1c) * m1c)
    var dhdt1 = dt * (alpha_h(V1c) * (1 - h1c) - beta_h(V1c) * h1c)

    return [dVdt0, dndt0, dmdt0, dhdt0, dVdt1, dndt1, dmdt1, dhdt1]
  }

  const dt = 0.01
  const N = tf / dt

  var ts = Array.from(Array(N+1), (_, k) => k * dt)
  var V0 = Array(N+1).fill(0)  
  var n0 = Array(N+1).fill(0)
  var m0 = Array(N+1).fill(0)
  var h0 = Array(N+1).fill(0)
  var V1 = Array(N+1).fill(0)  
  var n1 = Array(N+1).fill(0)
  var m1 = Array(N+1).fill(0)
  var h1 = Array(N+1).fill(0)

  var I = Array(N+1).fill(0)

  const Vs = 0;
  V0[0] = Vs
  n0[0] = alpha_n(V0[0]) / (alpha_n(V0[0]) + beta_n(V0[0]))
  m0[0] = alpha_m(V0[0]) / (alpha_m(V0[0]) + beta_m(V0[0]))
  h0[0] = alpha_h(V0[0]) / (alpha_h(V0[0]) + beta_h(V0[0]))

  V1[0] = Vs
  n1[0] = alpha_n(V1[0]) / (alpha_n(V1[0]) + beta_n(V1[0]))
  m1[0] = alpha_m(V1[0]) / (alpha_m(V1[0]) + beta_m(V1[0]))
  h1[0] = alpha_h(V1[0]) / (alpha_h(V1[0]) + beta_h(V1[0]))
  I[0] = I_in(0, tf)

  for (let i = 0; i < N; i++) {

    var y = [V0[i], n0[i], m0[i], h0[i], V1[i], n1[i], m1[i], h1[i]];
    var [dVdt0, dndt0, dmdt0, dhdt0, dVdt1, dndt1, dmdt1, dhdt1] = derivatives(y, ts[i], dt, tf)
    // var [k1V0, k1n0, k1m0, k1h0, k1V1, k1n1, k1m1, k1h1] = derivatives(y, ts[i], dt, tf)
    // var y2 = [V0[i] + 0.5 * k1V0, n0[i] + 0.5 * k1n0, m0[i] + 0.5 * k1m0, h0[i] + 0.5 * k1h0, V1[i] + 0.5 * k1V1, n1[i] + 0.5 * k1n1, m1[i] + 0.5 * k1m1, h1[i] + 0.5 * k1h1]
    // var tmid = ts[i] + 0.5*dt
    // var [k2V0, k2n0, k2m0, k2h0, k2V1, k2n1, k2m1, k2h1] = derivatives(y2, tmid, dt, tf)
    
    // var y3 = [V0[i] + 0.5 * k2V0, n0[i] + 0.5 * k2n0, m0[i] + 0.5 * k2m0, h0[i] + 0.5 * k2h0, V1[i] + 0.5 * k2V1, n1[i] + 0.5 * k2n1, m1[i] + 0.5 * k2m1, h1[i] + 0.5 * k2h1]
    // var [k3V0, k3n0, k3m0, k3h0, k3V1, k3n1, k3m1, k3h1] = derivatives(y3, tmid, dt, tf)
    
    // var y4 = [V0[i] + 0.5 * k3V0, n0[i] + 0.5 * k3n0, m0[i] + 0.5 * k3m0, h0[i] + 0.5 * k3h0, V1[i] + 0.5 * k3V1, n1[i] + 0.5 * k3n1, m1[i] + 0.5 * k3m1, h1[i] + 0.5 * k3h1]
    // var tfin = ts[i] + dt
    // var [k4V0, k4n0, k4m0, k4h0, k4V1, k4n1, k4m1, k4h1] = derivatives(y4, tfin, dt, tf)
    
    // V0[i+1] = V0[i] + (1.0/6.0) * (k1V0 + 2.0*k2V0 + 2.0*k3V0 + k4V0)    
    // n0[i+1] = n0[i] + (1.0/6.0) * (k1n0 + 2.0*k2n0 + 2.0*k3n0 + k4n0)
    // m0[i+1] = m0[i] + (1.0/6.0) * (k1m0 + 2.0*k2m0 + 2.0*k3m0 + k4m0)
    // h0[i+1] = h0[i] + (1.0/6.0) * (k1h0 + 2.0*k2h0 + 2.0*k3h0 + k4h0)

    // V1[i+1] = V1[i] + (1.0/6.0) * (k1V1 + 2.0*k2V1 + 2.0*k3V1 + k4V1)    
    // n1[i+1] = n1[i] + (1.0/6.0) * (k1n1 + 2.0*k2n1 + 2.0*k3n1 + k4n1)
    // m1[i+1] = m1[i] + (1.0/6.0) * (k1m1 + 2.0*k2m1 + 2.0*k3m1 + k4m1)
    // h1[i+1] = h1[i] + (1.0/6.0) * (k1h1 + 2.0*k2h1 + 2.0*k3h1 + k4h1)

    V0[i+1] = V0[i] + dVdt0;
    n0[i+1] = n0[i] + dndt0;
    m0[i+1] = m0[i] + dmdt0;
    h0[i+1] = h0[i] + dhdt0;

    V1[i+1] = V1[i] + dVdt1;
    n1[i+1] = n1[i] + dndt1;
    m1[i+1] = m1[i] + dmdt1;
    h1[i+1] = h1[i] + dhdt1;
    I[i+1] = I_in(ts[i+1], tf)
  }
  return [V0, V1, ts, I]  
}