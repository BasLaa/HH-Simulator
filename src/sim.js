export function solve(tf, g_K=36, g_Na=120, g_L=0.3, V_K=-12, V_Na=115, V_L=10.613, C_m=1.0, Iin=10) {

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
    var [V, n, m, h] = y;

    var dVdt = dt * ((I_in(t, tf) - (I_K(V, n) + I_Na(V, m, h) + I_L(V))) / C_m)
    var dndt = dt * (alpha_n(V) * (1 - n) - beta_n(V) * n)
    var dmdt = dt * (alpha_m(V) * (1 - m) - beta_m(V) * m)
    var dhdt = dt * (alpha_h(V) * (1 - h) - beta_h(V) * h)

    return [dVdt, dndt, dmdt, dhdt]
  }

  const dt = 0.01
  const N = tf / dt

  var ts = Array.from(Array(N+1), (_, k) => k * dt)
  var V = Array(N+1).fill(0)  
  var n = Array(N+1).fill(0)
  var m = Array(N+1).fill(0)
  var h = Array(N+1).fill(0)
  var I = Array(N+1).fill(0)

  const V0 = 0;
  V[0] = V0
  n[0] = alpha_n(V0) / (alpha_n(V0) + beta_n(V0))
  m[0] = alpha_m(V0) / (alpha_m(V0) + beta_m(V0))
  h[0] = alpha_h(V0) / (alpha_h(V0) + beta_h(V0))
  I[0] = I_in(0, tf)

  for (let i = 0; i < N; i++) {

    var y = [V[i], n[i], m[i], h[i]]
    var [k1V, k1n, k1m, k1h] = derivatives(y, ts[i], dt, tf)
    
    var y2 = [V[i] + 0.5 * k1V, n[i] + 0.5 * k1n, m[i] + 0.5 * k1m, h[i] + 0.5 * k1h]
    var tmid = ts[i] + 0.5*dt
    var [k2V, k2n, k2m, k2h] = derivatives(y2, tmid, dt, tf)
    
    var y3 = [V[i] + 0.5 * k2V, n[i] + 0.5 * k2n, m[i] + 0.5 * k2m, h[i] + 0.5 * k2h]
    var [k3V, k3n, k3m, k3h] = derivatives(y3, tmid, dt, tf)
    
    var y4 = [V[i] + 0.5 * k3V, n[i] + 0.5 * k3n, m[i] + 0.5 * k3m, h[i] + 0.5 * k3h]
    var tfin = ts[i] + dt
    var [k4V, k4n, k4m, k4h] = derivatives(y4, tfin, dt, tf)
    
    V[i+1] = V[i] + (1.0/6.0) * (k1V + 2.0*k2V + 2.0*k3V + k4V)    
    n[i+1] = n[i] + (1.0/6.0) * (k1n + 2.0*k2n + 2.0*k3n + k4n)
    m[i+1] = m[i] + (1.0/6.0) * (k1m + 2.0*k2m + 2.0*k3m + k4m)
    h[i+1] = h[i] + (1.0/6.0) * (k1h + 2.0*k2h + 2.0*k3h + k4h)
    I[i+1] = I_in(ts[i+1], tf)
  }

  return [V, n, m, h, ts, I]  
}